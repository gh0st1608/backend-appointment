import { fromIni } from '@aws-sdk/credential-providers';

export const getAwsCredentials = () => {
  if (process.env.AWS_LOCAL === 'true') {
    return fromIni({ profile: 'default' });
  }
  return undefined;
};
