// SPDX-License-Identifier: MIT
pragma solidity 0.8.12;


contract Twitter {    
    struct Commentaires {
        address commenter;
        string content;
        uint timestamp;
    }

    struct Post {
    mapping(uint => Commentaires) listmsg;
    uint nb_comment;
    address commenter;
    string content;
    uint timestamp;
    uint totalReward; 
    uint rewardCount;
}

	mapping(uint => Post) private Feed;
    uint private Feed_size;


    function uint2str(uint256 _i) internal pure returns (string memory str){
        if (_i == 0){
            return "0";
        }
        uint256 j = _i;
        uint256 length;
        while (j != 0)
        {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length;
        j = _i;
        while (j != 0)
        {
            bstr[--k] = bytes1(uint8(48 + j % 10));
            j /= 10;
        }
            str = string(bstr);
        }


	function SendPost(string memory _content) public {
        uint contentLength = bytes(_content).length;
        require(contentLength > 0, "Please provide a message!");
        Feed[Feed_size].content = _content;
        Feed[Feed_size].timestamp = block.timestamp;
        Feed[Feed_size].commenter = msg.sender;
        Feed_size++;
        }

    
    function CommentPost(uint _id_post, string memory _comment) public {
        Feed[_id_post].listmsg[Feed[_id_post].nb_comment] = Commentaires(msg.sender, _comment, block.timestamp);
        Feed[_id_post].nb_comment++;
    }

    function getPost() public view returns (uint[] memory, string[] memory) {
        uint[] memory ids = new uint[](Feed_size);
        string[] memory contents = new string[](Feed_size);
        for(uint i = 0; i < Feed_size; i++){
            ids[i] = i;
            contents[i] = Feed[i].content;
            }
        return (ids, contents);
    }

    function getComments(uint _id_post) public view returns (uint[] memory, string[] memory){
        uint[] memory ids = new uint[](Feed[_id_post].nb_comment);
        string[] memory contents = new string[](Feed[_id_post].nb_comment);
        for(uint i = 0; i < Feed[_id_post].nb_comment; i++){
            ids[i] = i;
            contents[i] = Feed[_id_post].listmsg[i].content;
        }
        return (ids, contents);
    }

    function reward(uint _id_post) public payable{
        address payable post_owner = payable(Feed[_id_post].commenter);
        post_owner.transfer(msg.value);
        Feed[_id_post].totalReward += msg.value;
        Feed[_id_post].rewardCount++;
    }

    function getPostCreators() public view returns (uint[] memory, address[] memory) {
        uint[] memory ids = new uint[](Feed_size);
        address[] memory creators = new address[](Feed_size);
        for (uint i = 0; i < Feed_size; i++) {
            ids[i] = i;
            creators[i] = Feed[i].commenter;
        }
        return (ids, creators);
    }

    function getCommentCreators(uint _id_post) public view returns (uint[] memory, address[] memory){
        uint[] memory ids = new uint[](Feed[_id_post].nb_comment);
        address[] memory creators = new address[](Feed[_id_post].nb_comment);
        for (uint i = 0; i < Feed[_id_post].nb_comment; i++) {
            ids[i] = i;
            creators[i] = Feed[_id_post].listmsg[i].commenter;
        }
        return (ids, creators);
    }

    function getPostRewards(uint _id_post) public view returns (uint, uint) {
        return (Feed[_id_post].totalReward, Feed[_id_post].rewardCount);
    }
}
