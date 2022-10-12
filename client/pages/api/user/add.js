import { User } from '../../../models/userModel';
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */
import connectdb from '../../../utility/db/connectdb'

export default async function add(req, res) {

    const { walletAddress_1 } = req.body
    await connectdb();

    let user;

    const testme =await User.find({walletAddress:req.body.walletAddress}).limit(1);

    if(testme.length > 0)
    {
        user = testme[0];
    }
    else
    {
        user = await User.create({walletAddress:req.body.walletAddress, isApiActive: false, apiKey: ""});
    }

    res.status(200).json(user)

}