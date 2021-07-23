# [![logo](./logo.svg)](https://github.com/vweevers/common-changelog)

**Write changelogs for humans.**

Common Changelog is a style guide for changelogs, adapted from and a stricter subset of [Keep a Changelog](https://keepachangelog.com/). It embraces the guiding principle of [Keep a Changelog](https://keepachangelog.com/) that changelogs must be written by humans and for humans, while recognizing that a clean changelog starts with a clean git history. Let them strenghten each other.

![draft](https://img.shields.io/badge/status-draft-orange)

:rocket: _Too long didn't read? Here's an [example](https://github.com/Level/level/blob/master/CHANGELOG.md)._

## Table of Contents

<details><summary>Click to expand</summary>

- [1. Introduction](#1-introduction)
  - [1.1. What is a changelog?](#11-what-is-a-changelog)
  - [1.2. Guiding principles](#12-guiding-principles)
  - [1.3. Prerequisites](#13-prerequisites)
- [2. Format](#2-format)
  - [2.1. File format](#21-file-format)
  - [2.2. Release](#22-release)
  - [2.3. Notice](#23-notice)
  - [2.4. Change group](#24-change-group)
    - [2.4.1. Change](#241-change)
    - [2.4.2. References](#242-references)
    - [2.4.3. Authors](#243-authors)
    - [2.4.4. Prefixes](#244-prefixes)
  - [2.5. Markdown formatting](#25-markdown-formatting)
- [3. Writing](#3-writing)
  - [3.1. Generate a draft](#31-generate-a-draft)
  - [3.2. Remove noise](#32-remove-noise)
  - [3.3. Rephrase changes](#33-rephrase-changes)
  - [3.4. Merge related changes](#34-merge-related-changes)
  - [3.5. Skip no-op changes](#35-skip-no-op-changes)
  - [3.6. Separate commit message and description](#36-separate-commit-message-and-description)
  - [3.7. Promoting a prerelease](#37-promoting-a-prerelease)
- [4. Antipatterns](#4-antipatterns)
  - [4.1. Verbatim copying of content](#41-verbatim-copying-of-content)
  - [4.2. Conventional Commits](#42-conventional-commits)
  - [4.3. Confusing dates](#43-confusing-dates)
- [5. Integration](#5-integration)
  - [5.1. GitHub Actions](#51-github-actions)
- [6. FAQ](#6-faq)
  - [6.1. Why spend time on a changelog?](#61-why-spend-time-on-a-changelog)
  - [6.2. How is this different from Keep a Changelog?](#62-how-is-this-different-from-keep-a-changelog)
  - [6.3. Is there a badge?](#63-is-there-a-badge)
  - [6.4. What about yanked releases?](#64-what-about-yanked-releases)
  - [6.5. Should you ever rewrite a changelog?](#65-should-you-ever-rewrite-a-changelog)
  - [6.6. Is Common Changelog a commit convention?](#66-is-common-changelog-a-commit-convention)

</details>

## 1. Introduction

### 1.1. What is a changelog?

A changelog is a file that contains a curated, ordered list of notable changes for each versioned release of a project. Its purpose is to make it easier for consumers (and to a lesser extent contributors) to see precisely what changes have been made between two releases.

The consumers of software are human beings who care about what's in the software. They must be able to quickly understand the impact of a release. Semantic Versioning helps as a signaling mechanism but is not enough by itself. When software changes, people want to know why and how.

### 1.2. Guiding principles

- Changelogs are for humans.
- Communicate the impact of changes.
- Sort content by importance.
- Skip content that isn't.
- Link each change to further information.

### 1.3. Prerequisites

- Project is under version control (this document assumes git).
- Each released version has a corresponding git tag.
- Project adheres to [Semantic Versioning](https://semver.org/).

## 2. Format

### 2.1. File format

Filename must be `CHANGELOG.md`. File content must be Markdown and start with a first-level heading:

```md
# Changelog
```

Subsequent Markdown content must be zero or more releases, also referred to as changelog entries. Releases must be sorted latest-first according to [Semantic Versioning](https://semver.org/) rules, even if a release with a smaller version was published at a later time. This means that the semantically latest (and hence most important and frequently sought) release is at the top of the changelog. There must be an entry for every new stable release.

### 2.2. Release

A release must start with second-level Markdown heading, containing a semver-valid version (without "v" prefix) and a date in the form of `YYYY-MM-DD` ([ISO 8601](http://www.iso.org/iso/home/standards/iso8601.htm)).

```
## <version> - <date>
```

The version should match a git tag (with optional "v" prefix) unless it's a new version, of which the changelog entry should be committed before creating a git tag.

The version should link to further information. Use Markdown link references to keep the unrendered Markdown form of the changelog readable. If the project is hosted on GitHub, link the version to a [GitHub release](https://help.github.com/articles/creating-releases/) that should contain the same content as the changelog entry, alongside useful GitHub features like assets and the compare view.

<details>
<summary>Example</summary>

Valid:

```md
## [1.0.1] - 2019-08-24

### Fixed

- Prevent segmentation fault upon `close()`

## [1.0.0] - 2019-08-23

_Initial release._

[1.0.1]: https://github.com/owner/name/releases/tag/v1.0.1
[1.0.0]: https://github.com/owner/name/releases/tag/v1.0.0
```

Invalid:

```md
## [1.0.1](https://github.com/owner/name/releases/tag/v1.0.1)
## [1.0.0](https://github.com/owner/name/releases/tag/v1.0.0)

_Initial release._
```

</details>

After the heading, a release must have Markdown content that is either:

1. One or more [change groups](#24-change-group);
2. A [notice](#23-notice) followed by zero or more [change groups](#24-change-group).

Change groups are only optional if a notice explains why there aren't any. No other content is permitted, because a changelog is not a blog or detailed upgrade guide. Those have other goals and concerns and must be kept separate from the changelog.

### 2.3. Notice

A release might have a separate upgrade guide or blog post that is considered essential reading. Other times a release may need to clarify its status, when it was yanked or contains zero changes.

For these purposes a _notice_ must be used. This is a single-sentence paragraph with otherwise arbitrary Markdown content. Adding Markdown emphasis markers is recommended. For example (links omitted):

```md
## [2.0.0] - 2020-07-23

_If you are upgrading: please see [`UPGRADING.md`](UPGRADING.md)._

### Removed

- **Breaking:** remove `write()` method from public API (`01e3a64`)
```

Notices are also useful to describe first releases (that have no changes). For example:

```md
## [1.0.0] - 2019-08-23

_First release._
```

Use notices wisely, as they will be the first thing a reader sees at the expense of regularly structured content. There can only be one notice per release. If a notice pertains to code (rather than a release or associated artifacts) and has a suitable place outside of the changelog, write it there instead.

### 2.4. Change group

A change group must start with a third-level, text-only Markdown heading containing a category:

```
### <category>
```

The category must be one of (in order):

- `Changed` for changes in existing functionality
- `Added` for new functionality
- `Removed` for removed functionality
- `Fixed` for bug fixes.

The word _functionality_ here can also mean documentation, supported runtime environments and so forth. The categories exist to easily recognize the impact of changes and to allow skimming a changelog. Changes that are listed under `Removed` will typically be breaking, while anything under `Added` is potentially interesting to the reader but carries no risk when upgrading.

The heading must be followed by (and only by) an unnumbered Markdown list. Each item in the list should be a single line that must start with a [change](#241-change), followed by one or more [references](#242-references) and then zero or more [authors](#243-authors). For example, if Alice and Henry fixed a bug together (links omitted for brevity):

```
- Prevent buffer overflow (#28) (Alice, Henry)
```

The list should be sorted: breaking changes first, then by other importance, then latest-first. The importance of a change is left to the writer's discretion.

#### 2.4.1. Change

Write a change using the [imperative mood](https://en.wikipedia.org/wiki/Imperative_mood). It must start with a present-tense verb, for example (but not limited to) `Add`, `Refactor`, `Bump`, `Document`, `Fix`, `Deprecate`.

> :bulb: It's highly recommended that git commits follow the same convention. A changelog draft can then be generated from git history without having to rephrase commit messages. Using the imperative mood tells someone what applying a commit will do. Similarly, in a changelog it tells someone what upgrading will do. It communicates an _intent_ of change. Most importantly though, the choice of imperative mood is meant to increase consistency and avoid bike shedding.

Each change must be self-describing, as if no category heading exists. Instead of:

```md
### Added

- Support of CentOS
- `write()` method
- Documentation for the `read()` method
```

Write:

```md
### Added

- Support CentOS
- Add `write()` method
- Document the `read()` method
```

#### 2.4.2. References

A changelog is an alternative entrypoint to a codebase. It may be presented out-of-context in pull requests on third-party repositories, created by Dependabot or similar bots that read changelogs. Changes require context to understand and won't always be straightforward to describe, especially across language barriers.

For these reasons, changes must reference relevant commits, and should reference tickets or pull requests when available. Example:

```md
- Fix infinite loop ([#194](https://github.com/owner/name/issues/194))
```

References must be written after (and on the same line as) a change, so that content on that line is sorted by importance from left to right. References must be wrapped in parentheses. References of the same type may be separated by commas and only then wrapped in parentheses: `(#1, #2)` rather than `(#1) (#2)`. Each reference must be a Markdown link.

When there are more than two available references, only include the best starting point for people that wish to learn more. For example, if a change happened in a pull request that closed a ticket, prefer to reference the pull request and not the ticket.

References can be written in one of the following forms.

**Commits**

```md
([`53bd922`](https://github.com/owner/name/commit/53bd922))
([`owner/name@53bd922`](https://github.com/owner/name/commit/53bd922))
```

The latter form should only be used for git submodules. If subsystem prefixes are used (see below) then the former short form is sufficient.

**Pull Requests or issues**

```md
([#194](https://github.com/owner/name/issues/194))
([owner/name#194](https://github.com/owner/name/issues/194))
```

The latter form should only be used to reference issues in external repositories. This can be useful for cross-repository efforts where a single issue is used to track progress or to explain a common change in detail.

**External tickets**

```md
([JIRA-837](https://example.atlassian.net/browse/JIRA-837))
```

#### 2.4.3. Authors

Author names must be written after references, wrapped in parentheses and separated by commas. If the project only has one contributor, author names can be omitted. For changes authored by bots, the author listed in the changelog should be the person that merged the relevant Pull Request(s).

Example:

```md
- Fix infinite loop ([#194](https://github.com/owner/name/issues/194)) (Alice Meerkat)
```

There are no rules for whether to use the author's full name, username, or other. Common Changelog does recommend using the author's own preferred name, for which git is the most readily available source of truth.

#### 2.4.4. Prefixes

Breaking changes must be prefixed in bold with `**Breaking:** ` and should be listed before other changes (per category). For example (references omitted for brevity):

```md
### Changed

- **Breaking:** emit `close` event after `end`
- Refactor `sort()` internals to improve performance

### Removed

- **Breaking:** drop support of Node.js 8
```

For projects that contain _subsystems_ (git submodules or other units of code) a change may be prefixed in bold with the name of that subsystem. It then also helps to sort changes by subsystem. A breaking change in a subsystem should be prefixed like so: `**<subsystem> (breaking):** `. For example:

```md
- **Installer (breaking):** enable silent mode by default
- **UI**: tune button colors for accessibility
```

> :hand: The use of subsystems should generally be avoided as it weakens semver signaling.

### 2.5. Markdown formatting

Common Changelog has no opinions on Markdown formatting. The Markdown examples in this document follow the [`hallmark`](https://github.com/vweevers/hallmark) style guide.

## 3. Writing

### 3.1. Generate a draft

> :construction: I personally use [`hallmark bump`](https://github.com/vweevers/hallmark) to generate the initial content of a new changelog entry. However, it has not yet been adapted to follow Common Changelog, contains out-of-scope features, and has quirks when merge commits are used. That said, I do consider it an essential tool in my workflow and have every intention to bring it up to speed (or possibly fork it to handle changelogs separately).

### 3.2. Remove noise

Exclude maintenance changes that are not interesting to consumers of the project (in its distributed form). To name a few:

- Dotfile changes (`.gitignore`, `.github`, `.gitlab` and so forth)
- Changes to development-only dependencies
- Minor code style changes
- Formatting changes in documentation.

However, changes such as the following must _not_ be excluded:

- Refactorings, which may have unintentional side effects. Let the community review them.
- Changes to supported runtime environments (which may be reflected only in dotfiles)
- Code style changes that use new language features
- New documentation (if a feature was previously undocumented).

### 3.3. Rephrase changes

In a project with multiple contributors, people will use different words to say the same thing. Consider rephrasing changes in order to consistently communicate types of changes to the outside world. In addition, add details where missing or strip details when irrelevant. For example in:

```md
- Upgrade json-parser from 2.2.0 to 3.0.1
- Bump `xml-parser`
```

The first change is too specific (because the dependency is not pinned to that exact version, let's say) while the second change is not specific enough. Instead write:

```md
- Bump `json-parser` from 2.x to 3.x
- Bump `xml-parser` from 6.x to 8.x
```

Don't stray too far from the original commit messages though, because then fellow contributors will not recognize their changes in the changelog. Instead, make an effort on future changes to align terminology between contributors.

### 3.4. Merge related changes

If a change happened over multiple commits, consider listing them as one. Here are some examples (with pseudo references for brevity).

**Bumping the same dependency twice**

```md
- Bump `standard` from 15.x to 16.x (b)
- Bump `standard` from 14.x to 15.x (a)
```

Becomes:

```md
- Bump `standard` from 14.x to 16.x (a, b)
```

**Fixups**

```md
- Fix code style of new filter (b)
- Support filtering entries by name (a)
```

Becomes:

```md
- Support filtering entries by name (a, b)
```

### 3.5. Skip no-op changes

A changelog entry describes the difference between two releases. If commits between those releases negate each other (for example because one reverts the other) then leave them out of the changelog.

### 3.6. Separate commit message and description

A change should be brief and to the point, no more than one line long. This makes a list of changes easy to scan. Consider that the reader could be presented with changelogs of multiple projects, as is common when dependency updates are batched or when a breaking change has a ripple effect on dependent projects.

Long descriptions should be in commits or other references, even if the long description explains a breaking change. Given a commit like:

```
Breaking: bump yaml-parser from 4.x to 5.x

Removes the `unsafe` option.
```

The change should be (links omitted for brevity):

```
- **Breaking:** bump `yaml-parser` from 4.x to 5.x (`15d5a9e`)
```

The only exception to this rule is if the commit lacks a description. Then one could write:

```
- **Breaking:** bump `yaml-parser` from 4.x to 5.x (`15d5a9e`). Removes the `unsafe` option.
```

Alternatively, maintain a separate upgrade guide document for semver-major releases.

### 3.7. Promoting a prerelease

For promoting a prerelease to a release, choose one of three approaches according to the type of project and the nature of the prerelease.

**A. Copy content to release**

A generic approach is to copy content from prereleases to the release. Follow the same practices as when creating a changelog entry from commits. Meaning to merge related changes and so forth (as described above). Write the changelog entry as if the prereleases don't exist.

**B. Skip changelog entry for prerelease**

A prerelease does not need a changelog entry if the prerelease is made for internal testing purposes rather than public consumption, for example to test CI/CD triggered by a git tag.

**C. Refer to prerelease**

After a round of prereleases that each had a changelog entry, the entry for the release could simply state `Stable release based on <prerelease version>` (using a [notice](#23-notice)).

This approach is suitable for private projects with a lengthier release flow where (crucially) all stakeholders are familiar with the contents of a release by the time it's deemed stable. One such flow is to perform Quality Assurance on internally distributed prereleases. By design, the stable release then doesn't contain new content to be communicated.

For example (links omitted):

<details><summary>Click to expand</summary>

```md
## [3.1.0] - 2021-07-05

_Stable release based on [3.1.0-rc.2]._

## [3.1.0-rc.2] - 2021-07-04

### Fixed

- Use localized date formats on Schedule page (`a11eb73`)

## [3.1.0-rc.1] - 2021-07-03

### Added

- Add Schedule page listing upcoming events (`59a03a9`)
```

</details>

## 4. Antipatterns

### 4.1. Verbatim copying of content

Using `git log` as a changelog is a bad idea: it's full of noise. This doesn't necessarily mean that the commits are bad. They serve a different purpose: commits are meant to document a step in the evolution of source code.

Similarly, on projects that only land code through Pull Requests it may be tempting to write a changelog by listing those Pull Requests as-is. Which is not too different from listing commits.

For example (links omitted for brevity):

```md
- json-parser 8.0.2 is fixed (#295)
- doc: fix dead link to xml-entities (#296)
- Bump actions/checkout from v2.3.3 to v2.3.4 (#293)
- docs: fix entryWritten example (#294)
- Update test framework (#288)
- docs: use brackets for hyphenated fields (#291)
- fix: membrane options - misleading error message (#292)
```

There are several problems here, stemming from verbatim copying of content that was only meaningful to contributors to begin with. The `json-parser` change doesn't explain or reference what was fixed. There are insignificant documentation tweaks and maintenance changes that don't affect the distributed software. This changelog is difficult to read both in detail and high level. Having no changelog would even be better because to understand these changes one has to visit each of the commits. Did the changelog reduce or increase reading time?

Here's how one might improve it:

```md
### Changed

- Unpin `json-parser` having fixed alice/json-parser#38 (#295)

### Fixed

- Clarify that hyphenated fields in `filter` option must use brackets (#291)
- Use more specific errors for invalid `membrane` options (#292)
```

Readers that don't use the `filter` and `membrane` options can now skip those changes, which leaves them with only one task: follow the link to `json-parser` to learn what that's about. Or maybe not even that if the above changelog was for a semver-patch release. That's when semver signaling and clean changelogs really shine.

### 4.2. Conventional Commits

[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) adds cognitive overhead by injecting itself into the middle of a workflow. Changes do not start or end with commits.

For generating changelogs, Conventional Commits does help to initially categorize changes, but the use of Conventional Commits also means that commit messages must be converted to a more readable form. Using that form in the first place will align content across the board. Starting with stories and epics, then tickets, then commits, then pull requests, then changelogs. Ultimately this means less cognitive overhead, making room for everybody to understand and recognize each change presented in multiple contexts. This is the "end-to-end" approach of Common Changelog.

In [Why Use Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#why-use-conventional-commits) it's stated to be good for:

> Communicating the nature of changes to teammates, the public, and other stakeholders.

Common Changelog instead focuses on making changes descriptive and explaining _why_ a change is made. This tends to be forgotten in Conventional Commits because it gives commit authors the false impression that their messages are descriptive. To be fair, that is a general communication problem that Conventional Commits doesn't aim to solve. It is however a problem that should be prioritized - over automation and over rigid structure.

Common Changelog uses natural language (in the imperative mood) because it fits all contexts, including explaining changes to a stakeholder in person. Writing commit messages should be done like explaining them to humans. First and foremost to consumers, then to contributors and future selves.

Let's see how these Common Changelog principles can improve commit messages and consequently changelogs, by rewriting the commit examples from the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#examples) homepage.

**Unclear breaking change**

This Conventional Commit does not lead with the fact that it's breaking. The description of the feature on the first line does not explain how extending works. The second line does although according to its prefix (`BREAKING CHANGE`) it's instead supposed to explain why the change is breaking.

```
feat: allow provided config object to extend other configs

BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

Instead write (for example):

```
Breaking: support extending config files through `extends` key

This config key is now reserved and no longer exposed to userland code.
```

**Breaking change hidden as a refactoring**

Instead of:

```
refactor!: drop support for Node 6

BREAKING CHANGE: refactor to use JavaScript features not available in Node 6.
```

Write:

```
Breaking: refactor using new JavaScript features

Drops support of Node 6.
```

**Documentation tweak in unknown file**

Instead of:

```
docs: correct spelling of CHANGELOG
```

Write (for example):

```
Fix spelling of CHANGELOG in README
```

**Redundant type and scope information**

Instead of:

```
feat(lang): add polish language
```

Write:

```
Add polish translation
```

**Unnecessarily long description**

Instead of:

```
fix: correct minor typos in code

see the issue for details on typos fixed.

Reviewed-by: Z
Refs #133
```

Write:

```
Fix minor typos in code (#133)

Reviewed-by: Z
```

### 4.3. Confusing dates

Regional date formats vary throughout the world. The advantage of dates formatted like `2017-07-17` is that they follow the order of largest to smallest units: year, month, and day. This format also doesn't overlap in ambiguous ways with other date formats, unlike some regional formats that switch the position of month and day numbers. These reasons, and the fact this date format is an [ISO standard](http://www.iso.org/iso/home/standards/iso8601.htm), are why it is the recommended date format for changelog entries.

## 5. Integration

### 5.1. GitHub Actions

The following workflow is triggered by a tag and takes the changelog entry for that tag from `CHANGELOG.md` and creates a GitHub release with the same content. The [`anton-yurchenko/git-release`](https://github.com/anton-yurchenko/git-release) action that is used here also supports uploading assets to the GitHub release.

```yaml
name: Release
on:
  push:
    tags: ['*']
permissions:
  contents: write
jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Create GitHub release
        uses: docker://antonyurchenko/git-release:latest
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          ALLOW_TAG_PREFIX: true
```

## 6. FAQ

### 6.1. Why spend time on a changelog?

In one word: reciprocity. Spending a modest amount of time on writing a changelog saves every reader twice as much time.

On any project regardless of git practices, there will be mistakes, noise and miscommunication. That's only natural. If needed a project can move fast in git and slow down for the changelog. The release can wait 15 minutes more.

In git history, a new feature may get described in more than one way because it takes time to develop a vocabulary. Maintainers will merge imperfect pull requests to stop a lenghty back-and-forth. Contributors forget that the quality of their commit messages deteriorates over time as context is lost. And so on.

Writing the changelog is another feedback loop to think things through. A chance to look at the big picture: how do recent pull requests play together? Was anything missed? Does the version number accurately reflect changes? Perhaps changes are breaking in unforeseen ways. Or (rarer) the opposite of that, which could be a waste of semver-major signaling.

Don't take the easy way out with full automation. This results in poor changelogs, defeating their purpose.

### 6.2. How is this different from Keep a Changelog?

[Keep a Changelog](https://keepachangelog.com/) was one of the first complete guides for writing a changelog. It has solid principles and offers a high-level layout for a changelog. Common Changelog was born to fill in various gaps and leave less room for interpretation. Common Changelog is undoubtedly more opinionated, while equally striving for an approach that's suitable for any project.

More specifically, there are some differences in the changelog format.

**Additions**

Common Changelog adds [references](#242-references), [authors](#243-authors) and a way to [highlight breaking changes](#244-prefixes).

**Less categories**

Common Changelog does not have `Deprecated` and `Security` categories. A deprecation can be listed under the `Changed` category. For example: "Deprecate the security category".

**No Unreleased section**

Common Changelog does not have an `Unreleased` section at the top of the changelog, which Keep a Changelog recommends for listing unreleased changes as they land in the main branch of the project. In practice, especially with Common Changelog's addition of [references](#242-references), this is an unproductive workflow:

1. Although a commit or pull request could describe itself in the `Unreleased` section, it cannot add the necessary (self) references. These can only be added after the fact.
2. First-time contributors can't be expected to update the changelog. Maintainers would have to commit that separately, resulting in a noisy git history.
3. Writing a changelog requires a bird's-eye view of the project, while individual changes are typically best reviewed and discussed in isolation.

**No `[YANKED]` tag**

Instead of a special notation for yanked releases, Common Changelog uses [notices](#23-notice) as a more generic (but unparsable) format.

### 6.3. Is there a badge?

Yes! To promote the use of Common Changelog, the following Markdown can be placed in the project's readme:

```
[![Common Changelog](https://img.shields.io/badge/common_changelog-informational?logo=markdown)](https://github.com/vweevers/common-changelog)
```

[![Common Changelog](https://img.shields.io/badge/common_changelog-informational?logo=markdown)](https://github.com/vweevers/common-changelog)

### 6.4. What about yanked releases?

A yanked release should still have an entry in the changelog, assuming the release was public for more than a few hours. Add a [notice](#23-notice) explaining the status of the release and linking to more information if available. For example (links omitted):

```
## [8.5.1] - 2021-05-10

_This release was never published to npm due to security issues (#123)._
```

The notice should _not_ replace other content (i.e. the list of changes).

### 6.5. Should you ever rewrite a changelog?

Sure. There are always good reasons to improve a changelog and not just the last release. It's a historical record and a useful reference to answer questions like "When did X change?".

### 6.6. Is Common Changelog a commit convention?

No, if a commit convention means to encode information to be consumed by machines. The guidelines of Common Changelog can be used to write commit messages in a certain way and certainly recommend (but don't require) doing so. The key difference however is that Common Changelog targets human readers and avoids encoded communication. To say that `feat` is a feature and `!` denotes a breaking change for example.
