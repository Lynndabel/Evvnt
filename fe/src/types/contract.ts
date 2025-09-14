export interface Event {
  id: number;
  title: string;
  price: bigint;
  tickets: number;
  maxTickets: number;
  date: string;
  time: string;
  location: string;
  maxResalePrice: bigint;
  organizer: string;
  imageUrl?: string;
}

export interface TicketInfo {
  occasionId: number;
  seatNumber: number;
  isForSale: boolean;
  resalePrice: bigint;
  originalOwner: string;
}

export interface ContractConfig {
  address: string;
  chainId: number;
}
