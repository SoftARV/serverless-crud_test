require("dotenv/config");

const {
  MembersRepositories
} = require("../../repositories/members.repository");
const { withStatusCode } = require("../../utils/response.util");
const { withProcessEnv } = require("../../dynamodb.factory");

const docClient = withProcessEnv(process.env)();
const repository = new MembersRepositories(docClient);
const ok = withStatusCode(200, JSON.stringify);

exports.handler = async event => {
  const members = await repository.list();

  return ok(members);
};
