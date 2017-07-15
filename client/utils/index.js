import R from 'ramda';

const pipePromise = R.curry(
  (list, acc) => list.reduce((a, fn) => a.then(fn), Promise.resolve(acc)),
);

module.exports = {
  pipe: R.compose(pipePromise, R.unapply(R.flatten)),
};
