import { functions } from './firebase';

function build(name) {
  return async function(data) {
    let result = await functions.httpsCallable(name)(data);
    return result.data;
  }
}

export const certifications = {
  create: build('certifications-create'),
  update: build('certifications-update')
};
