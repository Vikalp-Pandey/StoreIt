import env from "@packages/env";
import { asyncHandler, logger, sendResponse } from "@packages/httputils";
import { generateUploadUrl } from "@services/fileupload";
import { Request,Response } from "express";

export const fileUpload  = asyncHandler(async(req:Request,res:Response)=>{
  
  const {fileName,fileType} = req.body;
  
  const uploadUrlObject = await generateUploadUrl(fileName,fileType,{
        bucket_name: env.BUCKET_NAME,
        region: env.AWS_REGION,
        accessKeyId:env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY
  })
  

  return sendResponse(res,200,"Temp Url for file",uploadUrlObject);
})