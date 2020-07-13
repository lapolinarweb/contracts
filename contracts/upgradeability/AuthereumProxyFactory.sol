pragma solidity 0.5.17;
pragma experimental ABIEncoderV2;

import "../base/Owned.sol";
import "./AuthereumProxy.sol";

contract AuthereumEnsManager {
    function register(string calldata _label, address _owner) external {}
}
/**
 * @title AuthereumProxyFactory
 * @author Authereum Labs, Inc.
 * @dev A factory that creates Authereum Proxies.
 */

contract AuthereumProxyFactory is Owned {

    string constant public name = "Authereum Proxy Factory";
    string constant public version = "2020070100";

    bytes private initCode;
    address private authereumEnsManagerAddress;
    
    AuthereumEnsManager authereumEnsManager;

    event InitCodeChanged(bytes initCode);
    event AuthereumEnsManagerChanged(address indexed authereumEnsManager);

    /// @dev Constructor
    /// @param _initCode Init code of the AuthereumProxy and constructor
    /// @param _authereumEnsManagerAddress Address for the Authereum ENS Manager contract
    constructor(bytes memory _initCode, address _authereumEnsManagerAddress) public {
        initCode = _initCode;
        authereumEnsManagerAddress =  _authereumEnsManagerAddress;
        authereumEnsManager = AuthereumEnsManager(authereumEnsManagerAddress);
        emit InitCodeChanged(initCode);
        emit AuthereumEnsManagerChanged(authereumEnsManagerAddress);
    }

    /**
     * Setters
     */

    /// @dev Setter for the proxy initCode
    /// @param _initCode Init code of the AuthereumProxy and constructor
    function setInitCode(bytes memory _initCode) public onlyOwner {
        initCode = _initCode;
        emit InitCodeChanged(initCode);
    }

    /// @dev Setter for the Authereum ENS Manager address
    /// @param _authereumEnsManagerAddress Address of the new Authereum ENS Manager
    function setAuthereumEnsManager(address _authereumEnsManagerAddress) public onlyOwner {
        authereumEnsManagerAddress = _authereumEnsManagerAddress;
        authereumEnsManager = AuthereumEnsManager(authereumEnsManagerAddress);
        emit AuthereumEnsManagerChanged(authereumEnsManagerAddress);
    }

    /**
     *  Getters
     */

    /// @dev Getter for the proxy initCode
    /// @return Init code
    function getInitCode() public view returns (bytes memory) {
        return initCode;
    }

    /// @dev Getter for the private authereumEnsManager variable
    /// @return Authereum Ens Manager
    function getAuthereumEnsManager() public view returns (address) {
        return authereumEnsManagerAddress;
    }

    /// @dev Create an Authereum Proxy and iterate through initialize data
    /// @notice The bytes[] _initData is an array of initialize functions. 
    /// @notice This is used when a user creates an account e.g. on V5, but V1,2,3, 
    /// @notice etc. have state vars that need to be included.
    /// @param _salt A uint256 value to add randomness to the account creation
    /// @param _label Label for the user's Authereum ENS subdomain
    /// @param _initData Array of initialize data
    function createProxy(
        uint256 _salt, 
        string memory _label,
        bytes[] memory _initData
    ) 
        public 
        onlyOwner
        returns (AuthereumProxy)
    {
        address payable addr;
        bytes memory _initCode = initCode;
        bytes32 salt = _getSalt(_salt, _initData);

        // Create proxy
        assembly {
            addr := create2(0, add(_initCode, 0x20), mload(_initCode), salt)
            if iszero(extcodesize(addr)) {
                revert(0, 0)
            }
        }

        // Loop through initializations of each version of the logic contract
        bool success;
        for (uint256 i = 0; i < _initData.length; i++) {
            require(_initData[i].length != 0, "APF: Empty initialization data");
            (success,) = addr.call(_initData[i]);
            require(success, "APF: Unsuccessful account initialization");
        }

        // Set ENS name
        authereumEnsManager.register(_label, addr);

        return AuthereumProxy(addr);
    }

    /// @dev Generate a salt out of a uint256 value and the init data
    /// @param _salt A uint256 value to add randomness to the account creation
    /// @param _initData Array of initialize data
    function _getSalt(uint256 _salt, bytes[] memory _initData) internal pure returns (bytes32) {
        bytes32 _initDataHash = keccak256(abi.encode(_initData));
        return keccak256(abi.encodePacked(_salt, _initDataHash)); 
    }
}