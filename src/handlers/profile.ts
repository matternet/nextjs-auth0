import { NextApiResponse, NextApiRequest } from 'next';

import { ISessionStore } from '../session/store';

export default function profileHandler(sessionStore: ISessionStore) {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (!req) {
      throw new Error('Request is not available');
    }

    if (!res) {
      throw new Error('Response is not available');
    }

    const session = await sessionStore.read(req, res);
    if (!session || !session.user) {
      res.status(401).json({
        error: 'not_authenticated',
        description: 'The user does not have an active session or is not authenticated'
      });
      return;
    }

    res.json(session.user);
  };
}
