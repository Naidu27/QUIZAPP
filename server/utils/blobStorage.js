const { BlobServiceClient } = require("@azure/storage-blob");
const { DefaultAzureCredential } = require("@azure/identity");

const storageAccountName = "quizzacc";
const containerName = "user-files";

const credential = new DefaultAzureCredential();

const blobServiceClient = new BlobServiceClient(
  `https://${storageAccountName}.blob.core.windows.net`,
  credential
);

const containerClient =
  blobServiceClient.getContainerClient(containerName);

async function uploadFile(fileBuffer, fileName, contentType) {
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);

  await blockBlobClient.uploadData(fileBuffer, {
    blobHTTPHeaders: {
      blobContentType: contentType,
    },
  });

  return blockBlobClient.url;
}

module.exports = {
  uploadFile,
};