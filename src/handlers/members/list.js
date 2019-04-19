require("dotenv/config");

const { MembersRepository } = require("../../repositories/members.repository");
const { withStatusCode } = require("../../utils/response.util");
const { withProcessEnv } = require("../../dynamodb.factory");

const docClient = withProcessEnv(process.env)();
const repository = new MembersRepository(docClient);
const ok = withStatusCode(200, JSON.stringify);

exports.handler = async event => {
  const members = await repository.list();

  return ok(members);
};
