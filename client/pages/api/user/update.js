import { User } from '../../../models/userModel';
/**
 * 
 * @param {import('next').NextApiRequest} req 
 * @param {import('next').NextApiResponse} res 
 */
import connectdb from '../../../utility/db/connectdb'

export default async function add(req, res) {


    const { keyGen, walletAddress } = req.body
    await connectdb();


    let user;   

    // const testme = await User.find({ walletAddress: req.body.walletAddress }).limit(1);

    User.findOneAndUpdate({walletAddress:walletAddress},{isApiActive: true, apiKey: keyGen},(error, data)=>{
        if(error)
        {
            console.log(error)
        }
    })

    

    res.status(200);

}