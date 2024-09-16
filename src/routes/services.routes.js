import {Router} from 'express'

const router = Router();

router.get('/services', (req, res)=>{
    res.send('services')
})

export default router;