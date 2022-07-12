import { Router } from "express";
import { CreatePupilController } from "../app/controllers/pupilControllers/CreatePupilController";
import { GetAllPupilsController } from "../app/controllers/pupilControllers/GetAllPupilsController";
import { UpdatePupilController } from "../app/controllers/pupilControllers/UpdatePupilController";
import { DeletePupilController } from "../app/controllers/pupilControllers/DeletePupilController";
import auth from "../middleware/Auth";
import { GetPupilController } from "../app/controllers/pupilControllers/GetPupilController";
import { AddImagePupilController } from "../app/controllers/pupilControllers/AddImagePupilController";
import { upload } from "../middleware/Upload";
import { GetMediaPupilController } from "../app/controllers/pupilControllers/GetMediaPupilController";

const pupilRouter = Router()

pupilRouter.post('/pupils', auth, new CreatePupilController().handle)
pupilRouter.get('/pupils', auth, new GetAllPupilsController().handle)
pupilRouter.put('/pupils/:id', auth, new UpdatePupilController().handle)
pupilRouter.delete('/pupils/:id', auth, new DeletePupilController().handle)
pupilRouter.get('/pupils/:id', auth, new GetPupilController().handle)
pupilRouter.post('/pupils/image/:id', auth, upload.single('image'), new AddImagePupilController().handle)
pupilRouter.get('/pupils/image/:id', new GetMediaPupilController().handle)

export default pupilRouter
