require("dotenv/config");

const { MembersRepository } = require("../../repositories/Members.repository");
const { withStatusCode } = require("../../utils/response.util");
const { parseWith } = require("../../utils/request.util");
const { withProcessEnv } = require("../../dynamodb.factory");

const docClient = withProcessEnv(process.env)();
const repository = new MembersRepository(docClient);
const created = withStatusCode(201);
const parseJson = parseWith(JSON.parse);

exports.handler = async event => {
  const { body } = event;
  const member = parseJson(body);

  await repository.put(member);

  return created();
};
