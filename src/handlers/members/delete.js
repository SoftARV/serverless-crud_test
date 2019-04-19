require("dotenv/config");

const {
  MembersRepositories
} = require("../../repositories/members.repository");
const { withStatusCode } = require("../../utils/response.util");
const { withProcessEnv } = require("../../dynamodb.factory");

const docClient = withProcessEnv(process.env)();
const repository = new MembersRepositories(docClient);
const noContent = withStatusCode(204);

exports.handler = async event => {
  const { id } = event.pathParameters;

  await repository.delete(id);

  return noContent();
};
