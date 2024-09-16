import {Router} from 'express'

const router = Router();

router.get('/clients', (req, res)=>{
    res.send('clients')
})

export default router;