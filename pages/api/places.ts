import { NextApiRequest, NextApiResponse } from 'next';
import { normalizeString, queryPlacesByCityOrProfession } from "../../utils/data/places";
import Place from "../../types/global";

type PlacesQueryResponse = {
  places_list?: Place[]
  message?: string
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PlacesQueryResponse>
) {

  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' })
    return
  }

  try {
    const query = req.query.query as string || '';
    const places = await queryPlacesByCityOrProfession(normalizeString(query))
    res.status(200).json({ places_list: places });
  }
  catch (e) {
    res.status(500).json({ message: 'Internal server error' })
  }
}