class Data {
    constructor() {
        this.issues = [] // [{ id: ...., date: ..., subject: ..., body: ..., status: 'open' | 'closed' }]
        this.issuesCount = 0
    }

    insertIssue(issue) {
        this.issues.push(issue)
        this.issuesCount++
    }

    getIssues() {
        return this.issues
    }

    findIssueById(issueId) {
        for (const issue of this.issues)
            if (issue.id === issueId)
                return issue

        return null
    }
}

// instance

const data = new Data()