import moize from "moize";

export type ScryfallCard = {
	name: string;
	scryfall_uri: string;
	related_uris: {
		edhrec: string;
		gatherer: string;
	};
	purchase_uris: {
		tcgplayer: string;
		cardhoarder: string;
		cardmarket: string;
	};
	image_uris?: {
		normal: string;
	};
	card_faces?: {
		image_uris: {
			normal: string;
		};
	}[];
};

export const getScryfallCard = moize.promise(
	async (name: string): Promise<ScryfallCard | null> => {
		const encodedName = encodeURIComponent(name);
		const url = `https://api.scryfall.com/cards/named?fuzzy=${encodedName}`;
		const response = await fetch(url);

		if (response.ok) {
			return await response.json();
		} else {
			return null;
		}
	},
	{
		maxSize: 2000, // Average response size is 5kb unzipped
	}
);