import { Router } from "express";
import { CreatePupilController } from "../app/controllers/pupilControllers/CreatePupilController";
import { GetAllPupilsController } from "../app/controllers/pupilControllers/GetAllPupilsController";
import { UpdatePupilController } from "../app/controllers/pupilControllers/UpdatePupilController";
import { DeletePupilController } from "../app/controllers/pupilControllers/DeletePupilController";
import auth from "../middleware/Auth";
import { GetPupilController } from "../app/controllers/pupilControllers/GetPupilController";

const pupilRouter = Router()

pupilRouter.post('/pupils', auth, new CreatePupilController().handle)
pupilRouter.get('/pupils', auth, new GetAllPupilsController().handle)
pupilRouter.put('/pupils/:id', auth, new UpdatePupilController().handle)
pupilRouter.delete('/pupils/:id', auth, new DeletePupilController().handle)
pupilRouter.get('/pupils/:id', new GetPupilController().handle)

export default pupilRouter