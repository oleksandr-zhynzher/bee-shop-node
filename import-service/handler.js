const AWS = require("aws-sdk");
const csvParser = require("csv-parser");

const s3 = new AWS.S3();
const BUCKET = "bee-shop-import-csv";

module.exports.importProductsFile = async (event) => {
  const fileName = event.queryStringParameters.name;
  const s3Params = {
    Bucket: BUCKET,
    Key: `uploaded/${fileName}`,
    Expires: 60,
    ContentType: "text/csv",
  };

  try {
    const signedUrl = await s3.getSignedUrlPromise("putObject", s3Params);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT",
      },
      body: JSON.stringify(signedUrl),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT",
      },
      body: JSON.stringify({ message: "Error generating signed URL" }),
    };
  }
};

module.exports.importFileParser = async (event) => {
  const s3Record = event.Records[0];
  const bucketName = s3Record.s3.bucket.name;
  const objectKey = decodeURIComponent(
    s3Record.s3.object.key.replace(/\+/g, " ")
  );

  const s3Stream = s3
    .getObject({
      Bucket: bucketName,
      Key: objectKey,
    })
    .createReadStream();

  s3Stream
    .pipe(csvParser())
    .on("data", (record) => {
      console.log(record);
    })
    .on("end", () => {
      console.log(`Successfully processed ${objectKey}`);
    })
    .on("error", (error) => {
      console.error(`Error processing ${objectKey}:`, error);
    });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "File processing started" }),
  };
};
