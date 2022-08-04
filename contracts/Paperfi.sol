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
        string assetURI,
        uint256 indexed timestamp,
        string indexed category,
        string categoryName,
        uint256 purchaseAmount
    );

    function publishPaper(
        string memory _title,
        string memory _author,
        uint256 _requiredAmount,
        string memory _imageURI,
        string memory _pdfURI,
        string memory _assetURI,
        string memory _category,
        string memory _desc,
        uint256 _purchaseAmount
    ) public {
        Paperfi newPaper = new Paperfi(
            _title,
            _author,
            _requiredAmount,
            _imageURI,
            _pdfURI,
            _assetURI,
            _desc,
            msg.sender,
            _purchaseAmount
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
            _assetURI,
            block.timestamp,
            _category,
            _category,
            _purchaseAmount
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
    string public assets;
    string public description;
    address payable public owner;
    uint256 public recievedAmount;
    uint256 public purchaseAmount;

    //events
    event donated(
        address indexed donar,
        uint256 indexed amount,
        uint256 indexed timestamp
    );

    event purchased(
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
        string memory _assetURI,
        string memory _desc,
        address paperOwner,
        uint256 _purchaseAmount
    ) {
        title = _title;
        author = _author;
        requiredAmount = _requiredAmount;
        image = _imageURI;
        pdf = _pdfURI;
        assets = _assetURI;
        description = _desc;
        owner = payable(paperOwner);
        purchaseAmount = _purchaseAmount;
    }

    function donate() public payable {
        require(requiredAmount > recievedAmount, "required funds fulfilled");
        require(msg.value > 0, "add some more funds");
        require(msg.sender != owner, "can't donate to yourself");

        owner.transfer(msg.value);
        recievedAmount += msg.value;
        emit donated(msg.sender, msg.value, block.timestamp);
    }

    function purchase() public payable {
        require(msg.value >= purchaseAmount, "Not enough funds");
        require(msg.sender != owner, "can't purchase your own assets");

        owner.transfer(msg.value);
        emit purchased(msg.sender, msg.value, block.timestamp);
    }
}
