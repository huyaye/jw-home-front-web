export const CODE_VERIFIER =
  "--8urVQ_F7HyDgA03aBbWrHp9BoTGKwfzzDvtV_0CwTUs9ni0M348nKaFYVJmTu2LgejOVxBGxlyR-Eeeg71IYVNcm4iEDqypo5SxHTeTxkmqgWIEBkqWSjN5xxGwfd_";
export const CODE_CHALLENGE_METHOD = "S256";
export const CODE_CHALLENGE = "BcQVJ7LKS-ekUSnN4UBxrfW7u4n9LNFmBQhhMKu-hwo";

// import crypto from "crypto";

// const base64URLEncode = (str) => {
//   return str
//     .toString("base64")
//     .replace(/\+/g, "-")
//     .replace(/\//g, "_")
//     .replace(/=/g, "");
// };

// const getCodeChallange = (verifier) => {
//   return base64URLEncode(crypto.createHash("sha256").update(verifier).digest());
// };

// export const CODE_CHALLENGE = getCodeChallange(CODE_VERIFIER);
