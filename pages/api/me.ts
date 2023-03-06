import {validateUser} from "../../lib/auth";

export default validateUser(async (req,res,user) =>{
    res.json(user)
})