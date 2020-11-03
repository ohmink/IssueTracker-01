//
//  IssueViewController.swift
//  IssueTracker
//
//  Created by 김석호 on 2020/11/02.
//

import UIKit

class IssueViewController: UIViewController {
    private lazy var dataSource = makeDataSource()

    let viewModel = IssueViewModel()
    @IBOutlet weak var collectionView: UICollectionView?
    override func viewDidLoad() {
        super.viewDidLoad()
        configureCollectionView()
        configureCell()
        configureFlowLayout()
        applySnapshot()
    }
}

// MARK: - Storyboard identifier
extension IssueViewController {
    private struct StoryBoard {
        static let cell = "IssueMainCell"
    }
}

// MARK: - Configure CollectionView
extension IssueViewController: UICollectionViewDelegate {
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        // TODO: - Action for click issue cell
    }
    
    private func configureCollectionView() {
        collectionView?.delegate = self
        collectionView?.dataSource = dataSource
    }
    
    private func configureCell() {
        let name = String(describing: IssueCell.self)
        let nibName = UINib(nibName: name, bundle: nil)
        collectionView?.register(nibName, forCellWithReuseIdentifier: StoryBoard.cell)
    }
    
    private func configureFlowLayout() {
        guard let layout = collectionView?.collectionViewLayout as? UICollectionViewFlowLayout else { return }
        layout.sectionHeadersPinToVisibleBounds = true
        layout.itemSize.width = view.frame.width
    }
}

// MARK: - UICollectionViewDiffableDataSource
extension IssueViewController {
    typealias DataSource = UICollectionViewDiffableDataSource<Int, Issue>
    typealias Snapshot = NSDiffableDataSourceSnapshot<Int, Issue>
    
    private func makeDataSource() -> DataSource {
        guard let collectionView = collectionView else { return DataSource() }
        return DataSource(collectionView: collectionView, cellProvider: {[weak self] (collectionView, indexPath, _) -> IssueCell? in
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: StoryBoard.cell, for: indexPath)
            guard let issueCell = cell as? IssueCell else { return IssueCell() }

            let issue = self?.viewModel.items?.issues[indexPath.row]
            self?.binding(cell: issueCell, issue: issue)
            
            return issueCell
        })
    }

    private func applySnapshot(animatingDifferences: Bool = true) {
        var snapshot = Snapshot()
        snapshot.appendSections([0])
        snapshot.appendItems(viewModel.items?.issues ?? [], toSection: 0)
        dataSource.apply(snapshot, animatingDifferences: animatingDifferences)
    }

    private func binding(cell: IssueCell, issue: Issue?) {
        cell.issueTitle?.text = issue?.title
        cell.milestoneTitle?.text = issue?.milestoneTitle
    }
    
}
