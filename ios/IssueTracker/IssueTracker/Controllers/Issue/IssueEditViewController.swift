//
//  IssueEditViewController.swift
//  IssueTracker
//
//  Created by 최광현 on 2020/11/11.
//

import UIKit

class IssueEditViewController: UIViewController, UICollectionViewDelegate {

    @IBOutlet weak var labelCollectionView: UICollectionView!
    @IBOutlet weak var assigneeCollectionView: UICollectionView!
    
    private let labels = [
        Label(labelName: "feature", color: "AA66DD"),
        Label(labelName: "develop", color: "88FF88"),
        Label(labelName: "hotfix", color: "BB8888")
    
    ]
    
    private let assignee = [
        User(userID: "godrm", profileURL: "http://url.com"),
        User(userID: "godrm2", profileURL: "http://url.com"),
        User(userID: "godrm3", profileURL: "http://url.com")
    ]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        labelCollectionView.delegate = self
        configureFlowLayout()
    }
    
    func configureFlowLayout() {
        let labelflowlayout = UICollectionViewFlowLayout()
        labelflowlayout.sectionInset = UIEdgeInsets(top: 20, left: 20, bottom: 20, right: 20)
        labelflowlayout.estimatedItemSize = CGSize(width: 70, height: 20)
        self.labelCollectionView.collectionViewLayout = labelflowlayout
        
        let assigneeFlowLayout = UICollectionViewFlowLayout()
        assigneeFlowLayout.itemSize = CGSize(width: 80, height: 100)
        self.assigneeCollectionView.collectionViewLayout = assigneeFlowLayout
        
    }
}

extension IssueEditViewController: UICollectionViewDataSource {
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        switch collectionView {
        case labelCollectionView:
            return self.labels.count
        case assigneeCollectionView:
            return 1
        default:
            return 0
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        switch collectionView {
        case labelCollectionView:
            return configureLabelCollectionViewCell(collectionView: collectionView, indexPath: indexPath)
        case assigneeCollectionView:
            return configureAssigneeCollectionViewCell(collectionView: collectionView, indexPath: indexPath)
        default:
            return UICollectionViewCell()
        }
        
    }
    
    func configureLabelCollectionViewCell(collectionView: UICollectionView, indexPath: IndexPath) -> UICollectionViewCell {
        let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "label", for: indexPath)
        let badge = LabelBadge(label: self.labels[indexPath.row])
        cell.addSubview(badge)
        cell.heightAnchor.constraint(equalTo: badge.heightAnchor).isActive = true
        cell.widthAnchor.constraint(equalTo: badge.widthAnchor).isActive = true
        
        return cell
    }
    
    func configureAssigneeCollectionViewCell(collectionView: UICollectionView, indexPath: IndexPath) -> UICollectionViewCell {
        guard let assigneeCell = collectionView.dequeueReusableCell(withReuseIdentifier: "assignee", for: indexPath) as? AssigneeCell else { return AssigneeCell() }
        
        //dummy
        
        let dummyUser = User(userID: "dummy", profileURL: "http://com.com")
        let dummyIssue = Issue(title: "", user: dummyUser, label: [], milestoneTitle: nil)
        let dummyIssueVM = IssueCellViewModel(issue: dummyIssue)
        assigneeCell.configureCell(viewModel: dummyIssueVM)
        
        return assigneeCell
    }
    
    
    
}
