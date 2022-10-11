import { BigInt } from "@graphprotocol/graph-ts";


export const MINT = "MINT";
export const JSON = "JSON";
export enum TOKENDISPLAYTYPE {
	IMAGE = "IMAGE",
	VIDEO = "VIDEO",
	AUDIO = "AUDIO",
	TEXT_IMAGE = "TEXT_IMAGE",
	TEXT="TEXT",
	JSON="JSON"
}

export enum NFTTRANSACTIONTYPE{
		BUY = "BUY",
		MINT = "MINT",
		SALE = "SALE",
		GIFT = "GIFT"
} 

export enum TokenStandardType {
	  ERC1155 = "ERC1155",
	  ERC721 = "ERC721",
	  OTHER  = "OTHER"
}

export enum Network {
	  MAINNET = "MAINNET",
	  MATIC = "MATIC"
}

export const BIG_INT_ONE = BigInt.fromI32(1);

