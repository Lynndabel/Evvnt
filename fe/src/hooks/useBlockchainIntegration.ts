import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import { TICKET_CONTRACT_ABI } from '@/lib/contract-abi';
import { CONTRACT_CONFIG, DEFAULT_RPC_URL } from '@/lib/contract';
import { Event } from '@/types/contract';

interface UseBlockchainIntegrationReturn {
  createEvent: (eventData: any, organizerFee: string) => Promise<boolean>;
  mintTicket: (eventId: number, seatNumber: number, price: string) => Promise<{ success: true; tokenId: number } | { success: false }>;
  checkOrganizerStatus: (address: string) => Promise<boolean>;
  getEventDetails: (eventId: number) => Promise<Event | null>;
  getTotalOccassions: () => Promise<number>;
  getTotalSupply: () => Promise<number>;
  getRegistrationsForEvent: (eventId: number) => Promise<Array<{ tokenId: number; owner: string; seatNumber: number }>>;
  isLoading: boolean;
  error: string | null;
}

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || CONTRACT_CONFIG.address;
const ORGANIZER_FEE = '1000000000000'; // 0.000001 ETH in wei

export const useBlockchainIntegration = (): UseBlockchainIntegrationReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Signer-based contract (requires wallet) for write operations
  const getContract = useCallback(async () => {
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(CONTRACT_ADDRESS, TICKET_CONTRACT_ABI, signer);
  }, []);

  // Read-only contract via public RPC so UI works without wallet connection
  const getReadContract = useCallback(() => {
    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || DEFAULT_RPC_URL;
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    return new ethers.Contract(CONTRACT_ADDRESS, TICKET_CONTRACT_ABI, provider);
  }, []);

  const createEvent = useCallback(async (eventData: any, organizerFee: string = ORGANIZER_FEE): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const contract = await getContract();
      
      // Convert price to wei if it's a paid event
      const priceInWei = eventData.eventType === 'paid' 
        ? ethers.parseEther(eventData.price || '0')
        : BigInt(0);

      const maxResalePriceInWei = eventData.maxResalePrice 
        ? ethers.parseEther(eventData.maxResalePrice)
        : priceInWei;

      const tx = await contract.list(
        eventData.title,
        priceInWei,
        parseInt(eventData.maxTickets),
        eventData.date,
        eventData.time,
        eventData.location,
        maxResalePriceInWei,
        {
          value: ethers.parseUnits(organizerFee, 'wei')
        }
      );

      await tx.wait();
      return true;
    } catch (err: any) {
      console.error('Error creating event:', err);
      setError(err.message || 'Failed to create event');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [getContract]);

  const getTotalOccassions = useCallback(async (): Promise<number> => {
    try {
      const contract = getReadContract();
      const total = await contract.totalOccassions();
      return Number(total);
    } catch (err: any) {
      console.error('Error fetching total occasions:', err);
      return 0;
    }
  }, [getReadContract]);

  const getTotalSupply = useCallback(async (): Promise<number> => {
    try {
      const contract = getReadContract();
      const total = await contract.totalSupply();
      return Number(total);
    } catch (err: any) {
      console.error('Error fetching total supply:', err);
      return 0;
    }
  }, [getReadContract]);

  const getRegistrationsForEvent = useCallback(async (eventId: number): Promise<Array<{ tokenId: number; owner: string; seatNumber: number }>> => {
    try {
      const contract = getReadContract();
      const total = await contract.totalSupply();
      const regs: Array<{ tokenId: number; owner: string; seatNumber: number }> = [];
      for (let tokenId = 1; tokenId <= Number(total); tokenId++) {
        const details = await contract.getTicketDetails(tokenId);
        if (Number(details.occasionId) === eventId) {
          const owner = await contract.ownerOf(tokenId);
          regs.push({ tokenId, owner, seatNumber: Number(details.seatNumber) });
        }
      }
      return regs;
    } catch (err: any) {
      console.error('Error fetching registrations:', err);
      return [];
    }
  }, [getReadContract]);

  const mintTicket = useCallback(async (eventId: number, seatNumber: number, price: string): Promise<{ success: true; tokenId: number } | { success: false }> => {
    setIsLoading(true);
    setError(null);

    try {
      const contract = await getContract();
      const priceInWei = ethers.parseEther(price);

      const tx = await contract.mint(eventId, seatNumber, {
        value: priceInWei
      });

      const receipt = await tx.wait();
      // Parse ERC721 Transfer event to extract tokenId
      const transferTopic = ethers.id("Transfer(address,address,uint256)");
      let mintedTokenId: number | null = null;
      for (const log of receipt.logs) {
        if (log.topics && log.topics.length > 0 && log.topics[0] === transferTopic) {
          // tokenId is the 3rd indexed topic
          const tokenIdHex = log.topics[3];
          if (tokenIdHex) {
            mintedTokenId = Number(BigInt(tokenIdHex));
            break;
          }
        }
      }

      if (mintedTokenId !== null) {
        return { success: true, tokenId: mintedTokenId };
      }
      // Fallback if parsing failed
      return { success: true, tokenId: NaN };
    } catch (err: any) {
      console.error('Error minting ticket:', err);
      setError(err.message || 'Failed to purchase ticket');
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  }, [getContract]);

  const checkOrganizerStatus = useCallback(async (address: string): Promise<boolean> => {
    try {
      const contract = await getContract();
      return await contract.approvedOrganizers(address);
    } catch (err: any) {
      console.error('Error checking organizer status:', err);
      return false;
    }
  }, [getContract]);

  const getEventDetails = useCallback(async (eventId: number): Promise<Event | null> => {
    try {
      const contract = getReadContract();
      const eventDetails = await contract.getEventDetails(eventId);
      
      const event = {
        id: Number(eventDetails.id),
        title: eventDetails.title,
        price: eventDetails.price,
        tickets: Number(eventDetails.tickets),
        maxTickets: Number(eventDetails.maxTickets),
        date: eventDetails.date,
        time: eventDetails.time,
        location: eventDetails.location,
        maxResalePrice: eventDetails.maxResalePrice,
        organizer: eventDetails.organizer
      };
      
      // Debug logging
      console.log('getEventDetails Debug:', {
        eventId,
        rawTickets: eventDetails.tickets,
        rawMaxTickets: eventDetails.maxTickets,
        parsedTickets: event.tickets,
        parsedMaxTickets: event.maxTickets,
        available: event.maxTickets - event.tickets
      });
      
      return event;
    } catch (err: any) {
      console.error('Error fetching event details:', err);
      return null;
    }
  }, [getContract]);

  return {
    createEvent,
    mintTicket,
    checkOrganizerStatus,
    getEventDetails,
    getTotalOccassions,
    getTotalSupply,
    getRegistrationsForEvent,
    isLoading,
    error
  };
};
