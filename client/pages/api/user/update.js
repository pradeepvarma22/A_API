// import { User } from '../../../models/userModel';
// /**
//  * 
//  * @param {import('next').NextApiRequest} req 
//  * @param {import('next').NextApiResponse} res 
//  */
// import connectdb from '../../../utility/db/connectdb'

// export default async function update(req, res) {

//     const { walletAddress_1 } = req.body
//     await connectdb();

//     let user;
//     const testme = await User.exists();

//     if(testme)
//     {
//         user = testme;
//     }
//     else
//     {
//         user = await User.create(req.body);
//     }

//     res.status(200).json(user)


// }