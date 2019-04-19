require("dotenv/config");

const { MemberSeeder } = require("./member.seeder");
const { DynamoDB } = require("aws-sdk");
const { DocumentClient } = DynamoDB;
const membersData = require("./members-test.json");

const dynamo = new DynamoDB({
  endpoint: process.env.AWS_ENDPOINT,
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const doclient = new DocumentClient({ service: dynamo });
const memberSeeder = new MemberSeeder(dynamo, doclient);

const seedMember = async () => {
  console.log(`Checking if 'members' table exists`);

  const exists = await memberSeeder.hasTable();

  if (exists) {
    console.log(`Table 'members' exists, deleting`);
    await memberSeeder.deleteTable();
  }

  console.log(`Creating 'members' table`);
  await memberSeeder.createTable();

  log("Seeding data");
  await contactSeeder.seed(membersData);
};

seedMember()
  .then(() => console.log("done"))
  .catch(err => console.log(err));
