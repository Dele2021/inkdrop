import os, json
from web3 import Web3

# Connect to Ink chain
w3 = Web3(Web3.HTTPProvider('https://rpc-gel.inkonchain.com'))
print("Connected:", w3.is_connected())

PRIVATE_KEY = input("Enter private key (0x...): ").strip()
account = w3.eth.account.from_key(PRIVATE_KEY)
print("Deploying from:", account.address)
print("ETH balance:", w3.from_wei(w3.eth.get_balance(account.address), 'ether'))

FEE_RECIPIENT = input("Enter fee recipient address (your wallet): ").strip()

BYTECODE = "0x608060405234801561001057600080fd5b5060405161062538038061062583398101604081905261002f91610084565b6001600160a01b03811661005e5760405162461bcd60e51b8152600401610055906100b4565b60405180910390fd5b600080546001600160a01b0319166001600160a01b03929092169190911790556100e4565b60006020828403121561009657600080fd5b81516001600160a01b03811681146100ad57600080fd5b9392505050565b602080825260119082015270111959d85d1a5d99541c995c5d595cdd607a1b604082015260600190565b610532806100f36000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80639183b17714610030575b600080fd5b61004361003e3660046103a0565b610045565b005b6001600160a01b0384166100935760405162461bcd60e51b815260206004820152600a60248201526f7a65726f20746f6b656e000000000000000000000000000000000000604082015260600190565b6001600160a01b0383166100e15760405162461bcd60e51b815260206004820152600b60248201526a7a65726f2073656c6c657260a81b604082015260600190565b600082116101265760405162461bcd60e51b8152602060048201526009602482015268061657520616d6f756e7407c604082015260600190565b60006064610135846064610465565b61013f9190610484565b90506000610158610151856064610465565b8290036104a6565b6000546040516323b872dd60e01b81523360048201526001600160a01b0387811660248301526044820185905291925090911690636323b872dd90606401602060405180830381600087803b1580156101af57600080fd5b505af11580156101c3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101e791906104b9565b506000546040516323b872dd60e01b81523360048201526001600160a01b038781166024830152604482018590529091169063"

ABI = json.loads('[{"inputs":[{"internalType":"address","name":"_feeRecipient","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"string","name":"linkId","type":"string"},{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":true,"internalType":"address","name":"seller","type":"address"},{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"fee","type":"uint256"}],"name":"Payment","type":"event"},{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"address","name":"_seller","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"string","name":"_linkId","type":"string"}],"name":"pay","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"feeRecipient","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"}]')

print("\nDeploying contract...")
