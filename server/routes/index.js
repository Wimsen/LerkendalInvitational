import express from 'express';

const indexRouter = express.Router();
export default indexRouter;

indexRouter.get('*', ( req, res ) => {
    res.sendFile(path.join( __dirname, '../../dist/index.html' ));
});
