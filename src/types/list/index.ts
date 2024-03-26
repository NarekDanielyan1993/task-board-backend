import { Schema } from 'mongoose';

export default interface IList {
    boardId: Schema.Types.ObjectId;
    stageId: Schema.Types.ObjectId;
}
