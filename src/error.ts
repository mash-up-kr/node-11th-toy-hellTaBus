export const Err = { // TODO: 도메인별로 분리?
  EXISTING_USER: {
    code: 1,
    message: '이미 존재하는 유저입니다.',
  },
  ALREADY_LIKE: {
    code: 2,
    message: '좋아요가 이미 존재합니다.',
  },
  ALREADY_DISLIKE: {
    code: 3,
    message: '좋아요가 이미 취소되었습니다.',
  },
  NOT_EXISTING_USER: {
    code: 4,
    message: '존재하지 않은 유저입니다.',
  },
  NOT_EXISTING_POST: {
    code: 5,
    message: '존재하지 않는 포스트입니다.',
  },
  NOT_AUTHORIZED: {
    code: 6,
    message: '권한이 없습니다.',
  },
};
