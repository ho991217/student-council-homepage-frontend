/** 보안 수준을 확인 해 주는 함수,
 * 0(설정 불가)
 * ~
 * 5(아주 강력)
 * 까지 존재
 */
function CheckPasswordSecurity(password: string): number {
  let secureLevel = 0;
  /** 8자 이상, 하나 이상의 문자와 숫자를 포함 */
  const atoz0to9 = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/g;
  /** 8자 이상, 하나 이상의 문자, 숫자, 특수문자 */
  const atoz0to9Sym =
    /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g;
  /** 8자 이상, 하나 이상의 대문자, 소문자, 숫자 */
  const AtoZatoz0to9 =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/g;
  /** 8자 이상, 하나 이상의 대문자, 소문자, 숫자, 특수문자 */
  const AtoZatoz0to9Sym =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g;
  const AtoZatoz0to9SymOver10 =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/g;
  if (atoz0to9.test(password)) secureLevel += 1;
  if (atoz0to9Sym.test(password)) secureLevel += 1;
  if (AtoZatoz0to9.test(password)) secureLevel += 1;
  if (AtoZatoz0to9Sym.test(password)) secureLevel += 1;
  if (AtoZatoz0to9SymOver10.test(password)) secureLevel += 1;
  return secureLevel;
}

export default CheckPasswordSecurity;
