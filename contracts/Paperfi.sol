// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract PaperfiFactory {
    address[] public publishedPapers;

    event paperPublished(
        string title,
        string author,
        uint256 requiredAmount,
        address indexed owner,
        address paperAddress,
        string imageURI,
        string pdfURI,
        uint256 indexed timestamp,
        string category
    );

    function publishPaper(
        string memory _title,
        string memory _author,
        uint256 _requiredAmount,
        string memory _imageURI,
        string memory _pdfURI,
        string memory _category,
        string memory _desc
    ) public {
        Paperfi newPaper = new Paperfi(
            _title,
            _author,
            _requiredAmount,
            _imageURI,
            _pdfURI,
            _desc
        );

        publishedPapers.push(address(newPaper));

        emit paperPublished(
            _title,
            _author,
            _requiredAmount,
            msg.sender,
            address(newPaper),
            _imageURI,
            _pdfURI,
            block.timestamp,
            _category,
        );
    }
}

contract Paperfi {
    //states
    string public title;
    string public author;
    uint256 public requiredAmount;
    string public image;
    string public pdf;
    string public description;
    address payable public owner;
    uint256 public recievedAmount;

    //events
    event donated(
        address indexed donar,
        uint256 indexed amount,
        uint256 indexed timestamp
    );

    //constructor
    constructor(
        string memory _title,
        string memory _author,
        uint256 _requiredAmount,
        string memory _imageURI,
        string memory _pdfURI,
        string memory _desc
    ) {
        title = _title;
        author = _author;
        requiredAmount = _requiredAmount;
        image = _imageURI;
        pdf = _pdfURI;
        description = _desc;
        owner = payable(msg.sender);
    }

    function donate() public payable {
        require(requiredAmount > recievedAmount, "requird funds fulfilled");
        require(msg.value > 0, "add some more funds");
        require(msg.sender != owner, "can't donate to yourself");

        owner.transfer(msg.value);
        recievedAmount += msg.value;
        emit donated(msg.sender, msg.value, block.timestamp);
    }
}
