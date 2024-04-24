import { readFileSync } from "fs";
import path from "path";

export type emailProps = {
  title: string,
  preheader: string,
  welcome: string,
  headerMessage: string,
  linkCTA: string,
  stringCTA: string,
  footerMessage: string,
  bye: string,
  companyInfo: string,
  poweredLink: string,
  poweredName: string,
}
export const emailTemplate = (props: emailProps) => {
  const templatePath = path.join(__dirname, 'assets/emailsTemplate', 'welcomeEmail.html');
  const templateString = readFileSync(templatePath, { encoding: 'utf8' });
  let emailString = templateString
  for (const [key, value] of Object.entries(props)) {
    emailString = emailString.replace('${props.' + key + '}', value)
  }
  return emailString
}
