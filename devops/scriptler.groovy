import hudson.model.*
import hudson.tools.*
import java.util.logging.Logger
import jenkins.*
import jenkins.model.*
import org.jenkinsci.plugins.scriptler.config.*
import org.jenkinsci.plugins.scriptler.*

Logger logger = Logger.getLogger("")

def keyCredentialId = "jira-user-password-sitename"
def JIRA_URL = "https://sitename.atlassian.net"

logger.info('Accessing Jira api token')
def creds = com.cloudbees.plugins.credentials.CredentialsProvider.lookupCredentials(
      com.cloudbees.plugins.credentials.Credentials.class,
)

def JIRA_USER
def JIRA_PASS

for (c in creds) {
  if (c.id == keyCredentialId) {
      JIRA_USER = c.username
      JIRA_PASS = c.password
      break
  }
}

def ENCODED_PASSWORD="${JIRA_USER}:${JIRA_PASS}".bytes.encodeBase64().toString()

try {
    links=executeShell("""
    data=\$( curl -s --location \
      --request GET "${JIRA_URL}/rest/api/2/issue/${JIRA_ISSUE_KEY}?fields=issuelinks" \
      --header 'Authorization: Basic ${ENCODED_PASSWORD}')

      echo \$data | jq  -r '.fields.issuelinks' | jq -r ".[] | .inwardIssue.key"

""")
    arraylinks = links.readLines()
    arraylinksFinal = (arraylinks.isEmpty()) ? ['No Linked Jira Issues found'] : arraylinks
    return arraylinksFinal
} catch (Exception e) {
    println (e)
}

// Only allow execute one command line or call an script.sh
def executeShell (String command) {
    def sout = new StringBuffer(), serr = new StringBuffer()
    def proc = ['bash', '-c', command].execute()
    proc.waitForProcessOutput(sout, serr)
    println(serr)
    println(sout)
    return sout
}
