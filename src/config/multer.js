import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);
        /**
         * Filename: randomBytes + extension of the original file
         * Example: j23jn3jk123jn45j3.png
         */
        console.log(file);
        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
