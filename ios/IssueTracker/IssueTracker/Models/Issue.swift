//
//  Issue.swift
//  IssueTracker
//
//  Created by 최광현 on 2020/11/03.
//

import Foundation

struct Issue: Codable, Hashable {
    let title: String
    let issueID: Int?
    let createdAt: String?
    let isOpen: Int?
    let userAuthor, user: User?
    let issueLabels: [IssueLabel]?
    let milestone: Milestone?
    let comments: [Comment]?

    enum CodingKeys: String, CodingKey {
        case title
        case issueID = "issueId"
        case createdAt, isOpen
        case userAuthor = "UserAuthor"
        case user = "User"
        case issueLabels = "IssueLabels"
        case milestone = "MileStone"
        case comments = "Comments"
    }
    
    init(title: String, user: User? = nil, label: [IssueLabel]? = [], milestoneTitle: Milestone? = nil) {
        self.title = title
        self.issueID = nil
        self.createdAt = nil
        self.isOpen = nil
        self.userAuthor = nil
        self.user = user
        self.issueLabels = label
        self.milestone = milestoneTitle
        self.comments = nil
    }
    
    static func == (lhs: Issue, rhs: Issue) -> Bool {
        lhs.issueID == rhs.issueID
    }
}

struct IssueParameter: Codable {
    let title: String
    let assignees: String?
    let milestoneId: Int?
    let label: [String]?
    
    init(issue: Issue) {
        self.title = issue.title
        self.assignees = issue.userAuthor?.userID
        self.label = issue.issueLabels?.map({ issueLabel -> String in
            issueLabel.label.labelName
        })
        self.milestoneId = issue.milestone?.milestoneID
    }
}
