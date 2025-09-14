// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Ticket is ERC721 {
    address public owner;
    uint256 public totalOccassions;
    uint256 public totalSupply;
    uint256 public constant ORGANIZER_FEE = 1000000000000; // 0.000001 ETH in wei

    struct Occassion {
        uint256 id;
        string title;
        uint256 price;
        uint256 tickets;
        uint256 maxTickets;
        string date;
        string time;
        string location;
        uint256 maxResalePrice;
        address organizer; // Track who created the event
    }

    struct TicketInfo {
        uint256 occasionId;
        uint256 seatNumber;
        bool isForSale;
        uint256 resalePrice;
        address originalOwner; 
    }

    mapping(uint256 => Occassion) occasions;
    mapping(uint256 => mapping(address => bool)) public hasBought;
    mapping(uint256 => mapping(uint256 => address)) public seatTaken;
    mapping(uint256 => uint256[]) seatsTaken;
    mapping(uint256 => TicketInfo) public ticketDetails;
    mapping(address => bool) public approvedOrganizers; // Track approved organizers
    mapping(address => uint256[]) public organizerEvents; // Track events by organizer

    event TicketListedForSale(uint256 tokenId, uint256 price);
    event TicketSold(uint256 tokenId, address from, address to, uint256 price);
    event TicketUnlisted(uint256 tokenId);
    event EventCreated(uint256 eventId, address organizer, string title);
    event OrganizerApproved(address organizer);
    event OrganizerRevoked(address organizer);
    
        /**
 * @notice Restricts function access to only the contract owner
 * @dev Throws if called by any account other than the owner
 */
    modifier onlyOwner {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    /**
     * @notice Restricts function access to only the ticket owner
     * @dev Throws if called by any account other than the ticket owner
     */
    modifier onlyTicketOwner(uint256 tokenId) {
        require(ownerOf(tokenId) == msg.sender, "Caller is not the ticket owner");
        _;
    }

    /**
     * @notice Restricts function access to approved organizers
     * @dev Throws if called by any account that is not an approved organizer
     */
    modifier onlyApprovedOrganizer() {
        require(approvedOrganizers[msg.sender] || msg.sender == owner, "Caller is not an approved organizer");
        _;
    }

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        owner = msg.sender;
        approvedOrganizers[msg.sender] = true; // Owner is automatically an approved organizer
    }
    /// @notice Creates a new event occasion with specified details
/// @param _title Name of the event
/// @param _price Cost per ticket in wei
/// @param _maxTickets Maximum number of tickets available
/// @param _date Date of the event
/// @param _time Time of the event
/// @param _location Location where event will be held
/// @dev Only callable by contract owner
   function list(
    string memory _title,
    uint256 _price,
    uint256 _maxTickets,
    string memory _date,
    string memory _time,
    string memory _location,
    uint256 _maxResalePrice
   ) public payable {
    require(msg.value >= ORGANIZER_FEE, "Insufficient fee to create event");
    totalOccassions++;
    occasions[totalOccassions] = Occassion(
        totalOccassions,
        _title,
        _price,
        _maxTickets, // initial available tickets
        _maxTickets,
        _date,
        _time,
        _location,
        _maxResalePrice,
        msg.sender // Track who created the event
    );
    
    // Track this event for the organizer
    organizerEvents[msg.sender].push(totalOccassions);
    
    emit EventCreated(totalOccassions, msg.sender, _title);
}
/// @notice Mints a new ticket NFT for a specific occasion and seat
/// @param _id The ID of the occasion to mint a ticket for
/// @param _seat The seat number to assign to the ticket
/// @dev Requires sufficient ETH payment, valid occasion ID, and available seat
/// @dev Updates occasion tickets count, seat assignments and total supply
 function mint(uint256 _id, uint256 _seat) public payable {
    // Checking that id is not 0 or less than total occassions...
    require(_id != 0, "Occasion ID must be greater than 0");
    require(_id <= totalOccassions, "Occasion ID exceeds total occasions");

    // Require that ETH sent is greater than cost...
    require(msg.value >= occasions[_id].price, "Insufficient ETH sent for the occasion");

    // Require that the seat is not taken, and the seats exists...
    require(_seat < occasions[_id].maxTickets, "Seat number exceeds max tickets");
    require(seatTaken[_id][_seat] == address(0), "Seat is already taken");

    // Ensure there are tickets available
    require(occasions[_id].tickets > 0, "Sold out");

    occasions[_id].tickets -= 1; // Updating available ticket count
    hasBought[_id][msg.sender] = true; // Update buying status
    seatTaken[_id][_seat] = msg.sender; // Assigning seat
    seatsTaken[_id].push(_seat); // Update seats currently taken
    totalSupply++;

    // Create ticket details
    ticketDetails[totalSupply] = TicketInfo({
        occasionId: _id,
        seatNumber: _seat,
        isForSale: false,
        resalePrice: 0,
        originalOwner: msg.sender
    });

    _safeMint(msg.sender, totalSupply);
 }

 function listTicketForSale(uint256 tokenId, uint256 price) public onlyTicketOwner(tokenId) {
    TicketInfo storage ticket = ticketDetails[tokenId];
    Occassion storage occasion = occasions[ticket.occasionId];

    require(!ticket.isForSale, "Ticket already listed for sale");
    require(price <= occasion.maxResalePrice, "Price exceeds maximum allowed");

    ticket.isForSale = true;
    ticket.resalePrice = price;

    emit TicketListedForSale(tokenId, price);
}

// Remove ticket from sale
function unlistTicket(uint256 tokenId) public onlyTicketOwner(tokenId) {
    TicketInfo storage ticket = ticketDetails[tokenId];
    require(ticket.isForSale, "Ticket not listed for sale");

    ticket.isForSale = false;
    ticket.resalePrice = 0;

    emit TicketUnlisted(tokenId); 
}

// Purchase a resale ticket
    function buyResaleTicket(uint256 tokenId) public payable {
        TicketInfo storage ticket = ticketDetails[tokenId];
        require(ticket.isForSale, "Ticket not for sale");
        require(msg.value >= ticket.resalePrice, "Insufficient payment");
        
        address seller = ownerOf(tokenId);
        require(msg.sender != seller, "Cannot buy your own ticket");

        // Update ticket details
        ticket.isForSale = false;
        uint256 resalePrice = ticket.resalePrice;
        ticket.resalePrice = 0;

        // Transfer ownership
        _transfer(seller, msg.sender, tokenId);

        // Update seat tracking
        seatTaken[ticket.occasionId][ticket.seatNumber] = msg.sender;
        hasBought[ticket.occasionId][msg.sender] = true;

        // Transfer payment to seller
        (bool success, ) = payable(seller).call{value: resalePrice}("");
        require(success, "Transfer to seller failed");

        emit TicketSold(tokenId, seller, msg.sender, resalePrice);
    }

    // Getting ticket details
    function getTicketDetails(uint256 tokenId) public view returns (
        uint256 occasionId,
        uint256 seatNumber,
        bool isForSale,
        uint256 resalePrice,
        address originalOwner
    ) {
        TicketInfo storage ticket = ticketDetails[tokenId];
        return (
            ticket.occasionId,
            ticket.seatNumber,
            ticket.isForSale,
            ticket.resalePrice,
            ticket.originalOwner
        );
    }

    // Checking if the ticket is for sale
    function isTicketForSale(uint256 tokenId) public view returns (bool, uint256) {
        TicketInfo memory ticket = ticketDetails[tokenId];
        return (ticket.isForSale, ticket.resalePrice);
    }
/// @notice Allows the owner to withdraw all ETH from the contract
/// @dev Uses low-level call to transfer ETH balance to owner
/// @custom:security Non-reentrant by default since state changes happen before transfer
 function withdraw() public onlyOwner {
    (bool success,) = owner.call{value: address(this).balance}("");
    require(success);
 }

    /**
     * @notice Approve an organizer to create events
     * @param _organizer Address of the organizer to approve
     * @dev Only callable by contract owner
     */
    function approveOrganizer(address _organizer) public onlyOwner {
        require(_organizer != address(0), "Invalid organizer address");
        approvedOrganizers[_organizer] = true;
        emit OrganizerApproved(_organizer);
    }

    /**
     * @notice Revoke organizer approval
     * @param _organizer Address of the organizer to revoke
     * @dev Only callable by contract owner
     */
    function revokeOrganizer(address _organizer) public onlyOwner {
        require(_organizer != address(0), "Invalid organizer address");
        approvedOrganizers[_organizer] = false;
        emit OrganizerRevoked(_organizer);
    }

    /**
     * @notice Get events created by a specific organizer
     * @param _organizer Address of the organizer
     * @return Array of event IDs created by the organizer
     */
    function getOrganizerEvents(address _organizer) public view returns (uint256[] memory) {
        return organizerEvents[_organizer];
    }

    /*
     * @notice Get event details including organizer
     * @param _eventId ID of the event
     * @return Event details including organizer address
     */
    function getEventDetails(uint256 _eventId) public view returns (
        uint256 id,
        string memory title,
        uint256 price,
        uint256 tickets,
        uint256 maxTickets,
        string memory date,
        string memory time,
        string memory location,
        uint256 maxResalePrice,
        address organizer
    ) {
        require(_eventId > 0 && _eventId <= totalOccassions, "Invalid event ID");
        Occassion storage occasion = occasions[_eventId];
        return (
            occasion.id,
            occasion.title,
            occasion.price,
            occasion.tickets,
            occasion.maxTickets,
            occasion.date,
            occasion.time,
            occasion.location,
            occasion.maxResalePrice,
            occasion.organizer
        );
    }

    /**
     * @notice Check if an address is an approved organizer
     * @param _organizer Address to check
     * @return True if approved organizer, false otherwise
     */
    function isApprovedOrganizer(address _organizer) public view returns (bool) {
        return approvedOrganizers[_organizer] || _organizer == owner;
    }
}
