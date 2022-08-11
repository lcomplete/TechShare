---
created: 2022-08-10 18:11
layout: post
title: "我如何流畅地切换使用 Mac 和 Windows（一）"
date: 2022-08-10T23:52:31+0800
comments: true
tags: ["效率", "Mac", "Windows"]
categories: ["技术"]
toc: false
---

## 碎碎念，可以不看

最早使用 mac 还得追溯到 2011 年，当时移动应用开发刚刚兴起，我在一家小公司，既做服务端，又做客户端，当时在一台 PC 上装上了 hackintosh （黑苹果），就这样用 XCode 开发了一个 iOS 应用。

后来买了一台 mac mini，当时云存储不像现在这样方便，在 PC 和 Mac 上切换使用还是不太方便，于是过了一年多就把这台 mac mini 给卖掉了。

再后来我买了台 macbook pro，依靠 OneDrive 解决了数据同步问题，在 win 上使用机械键盘或静电容键盘，macbook pro 则一般使用笔记本形态，由于对键盘也存在某种肌肉记忆，在两个设备上也能够自如地切换使用。

由于做架构工作，在编码或审查代码工作较多的时候，我往往需要用 IDE 打开许多项目，这时 win 仍然是我的主力开发工具。

前两年苹果的 M1 Pro 问世了，macbook pro 的性能也可以用来当作主力开发了，于是我开始高频地在 mac 和 win 上切换使用。

除了 Macintosh 和 Windows，我平时还会偶尔使用 Linux 桌面系统，在切换使用这些系统的过程中其实并没有多少不便，一方面自己对多个系统都具备了相当的使用经验，另一方面高频使用的应用无非就是浏览器、IDE、聊天工具这类。

如果能够适应的话，倒也无需额外的工具，但本着精益求精的精神，在切换使用的过程中，我也摸索出一套适合自己的工具，使用这些工具能够更顺畅地切换使用这两个系统。

我用的这套方法并不复杂，下面做个简单的分享，第一部分先讲一讲快捷键的设置。

## 一套快捷键兼容多个系统

有一些方案是修改系统的键位，比如在 Windows 下将 Win 键与 Ctrl 键调换，这种方案对系统侵入性较强，所以个人不是很喜欢，我采用的方案是**增加新的快捷键使其匹配另一个系统的功能，令一套快捷键兼容多个系统**。

## Mac 上的设置

为方便对照，先回顾下 Mac 键盘与 Windows 键盘中两个修饰键位置的对应关系：`Opt -> Win`、`Cmd -> Alt` 。

Mac 上使用 `Thor` 、`Raycast`、`Karabiner-Elements` 和`系统设置`来配置快捷键，以下设置在 Windows 上都有对应的功能。

### Thor 的设置

| 快捷键  | 功能         |
| ------- | ------------ |
| Opt + R | 打开 Raycast |

设置原因：

- 在 Windows 上常用 Win+R 来进行快速启动。
- 方便单手打开 Raycast 。
- 这个免费的小工具设置起来方便，虽然大多数快捷键交由 Raycast 设置了，仍然保留了该工具。

设置建议：

- Raycast 中的快捷键设置也可以由 Thor 来完成。
- 这个设置可有可无，也可用其他工具来配置。

### Raycast

| 快捷键         | 功能                    |
| -------------- | ----------------------- |
| Opt + E        | 打开 Finder             |
| Opt + Tab      | 打开 Mission Control    |
| Ctrl + Cmd + Z | 打开/关闭 Telegram 窗口 |
| Ctrl + Cmd + C | 打开/关闭 Chrome 窗口   |
| Ctrl + Cmd + X | 打开/关闭 VS Code 窗口  |

设置原因：

- Windows 上常用 Win + E 打开资源管理器、Win + Tab 切换窗口。
- Ctrl + Cmd/Alt + Z 是早期使用 QQ 留下的习惯。
- 另外两个设置沿用了 `Ctrl + Cmd + 字母` 打开窗口的设置，方便打开高频使用的应用。
- Raycast 上还有许多好用的功能，于是作为一个必装工具，快捷键设置的任务也就交给它了。

### Karabiner-Elements

| 快捷键        | 功能       |
| ------------- | ---------- |
| Ctrl/RCmd + H | Move Left  |
| Ctrl/RCmd + J | Move Down  |
| Ctrl/RCmd + K | Move Up    |
| Ctrl/RCmd + L | Move Right |

设置原因：

- 方便 Vim 党操作。
- 使用 Ctrl 和 RCmd（右 Cmd） 作为触发键不与现有快捷键冲突。

设置建议：

- 若不使用 Cmd + H 隐藏窗口，Move 操作设置的 Ctrl 触发改为 `LCmd` 触发更为合适，具体哪种合适也取决于使用的是什么键盘，比如使用 Magic Keyboard 时使用 Cmd 或 `fn` 更加方便，使用键程较长的键盘时用 Ctrl 也很方便。

### 系统设置

Mac 中可使用系统设置来配置应用内快捷键，这部分设置其实可有可无。

在 Keyboard -> App Shortcuts 中配置 Chrome 快捷键，配置时注意功能名称需与菜单名称保持完全一致；

| 快捷键  | 功能名称            |
| ------- | ------------------- |
| Cmd + D | Open Location…      |
| Cmd + L | Bookmark This Page… |

设置原因：

- 将 Chrome 常用的「回到 Url 输入框」功能设置为与 Win 上的 `Alt + D` 一致，方便单手操作的同时也避免和 Cmd + H/J/K/L 快捷键冲突。

## Windows 上的设置

Win 上使用 `AutoHotKey` 来进行快捷键设置，对应的功能与上面提到的 Mac 设置一致，另外将常用的 Mac 快捷键操作设置到 Win 中。

### AutoHotKey

| 快捷键                          | 功能     |
| ------------------------------- | -------- |
| Alt + C                         | 复制     |
| Alt + X                         | 剪切     |
| Alt + V                         | 粘贴     |
| Alt + A                         | 全选     |
| Alt + W                         | 关闭窗口 |
| Alt + Z                         | 撤销     |
| Alt + F                         | 搜索     |
| Alt + Q                         | 退出     |
| Alt + Left                      | Home     |
| Alt + Right                     | End      |
| Alt + Shift + \[                | 「       |
| Alt + Shift + \]                | 」       |
| Alt + \[ （资源管理器、chrome）   | 返回     |
| Alt + \] （资源管理器、chrome） | 前进     |

除了 Mac 的常用快捷键外，还增加了一个鼠标的组合按键用于切换桌面。

| 快捷键                    | 功能         |
| ------------------------- | ------------ |
| 按住鼠标左键 + 鼠标前进键 | 向左移动桌面 |
| 按住鼠标左键 + 鼠标后退键 | 向右移动桌面 |

设置原因：

- Mac 的一大优势是多桌面，将多桌面的使用习惯应用到 Windows 上。
- 使用鼠标切换桌面本可以用罗技的 Anywhere 或 Master 系列鼠标来实现，但个人认为其过于臃肿导致软硬件不稳定，在使用体验上并不怎么样，所以才使用 AutoHotKey 来实现。

部分配置：

```shell
; ------- mac -------

$!c::
 Send {Ctrl Down}{c}{Ctrl Up}
Return
$!x::
 Send {Ctrl Down}{x}{Ctrl Up}
Return
$!v::
 Send {Ctrl Down}{v}{Ctrl Up}
Return
$!a::
 Send {Ctrl Down}{a}{Ctrl Up}
Return
$!s::
 Send {Ctrl Down}{s}{Ctrl Up}
Return
$!w::
 Send {Ctrl Down}{w}{Ctrl Up}
Return
$!z::
 Send {Ctrl Down}{z}{Ctrl Up}
Return
$!f::
 Send {Ctrl Down}{f}{Ctrl Up}
Return
$!q::
 Send {Alt Down}{F4}{Alt Up}
Return

$!Left::
 Send {Home}
Return

$!Right::
 Send {End}
Return

$!+Left::
 Send +{Home}
Return

$!+Right::
 Send +{End}
Return


; ----- display ------

~LButton & XButton1::send #^{Right}
return

~LButton & XButton2::send #^{left}
return

;~MButton & RButton::send #^{Right}
;return

;~MButton & LButton::send #^{left}
;return

; ------ vim -----

!k::   ;; !->alt   k->字母键k
Send {Up}   ;;输入 上 键
return
!j::
Send {Down}
return
!h::
Send {Left}
return
!l::
Send {Right}
return

; // 中文直角引号

!+[::send,{U+300C}            ;// alt + shift + [  转换为「
!+]::send,{U+300D}            ;// alt + shift + ]  转换为 」

; // 音量调节
!-::send,{Volume_Down}
!=::send,{Volume_Up}

; ----- explorer ---------

#IfWinActive ahk_class CabinetWClass
{
![::Send !{Left}
Return

!]::Send !{Right}
Return
}


; ----- chrome ---------

#IfWinActive ahk_exe chrome.exe
{
![::Send !{Left}
Return

!]::Send !{Right}
Return

!y::Send ^{h}
Return

!t::Send ^{t}
Return

!+t::Send ^+{t}
Return

!r::Send ^{r}
Return
}

#IfWinActive ahk_exe Code.exe
{
![::Send !{Left}
Return

!]::Send !{Right}
Return

!p::Send ^{p}
Return

!+p::Send ^+{p}
return
}

#IfWinActive ahk_exe Obsidian.exe
{
![::Send !{Left}
Return

!]::Send !{Right}
Return

!p::Send ^{p}
Return

!e::Send ^{e}
Return

!#e::Send ^!{e}
Return

!+d::Send ^+{d}
Return

!o::Send ^{o}
Return
}

#IfWinActive ahk_exe webstorm64.exe
{
![::Send ^!{Left}
Return

!]::Send ^!{Right}
Return

!e::Send ^{e}
Return

!o::Send ^{n}
Return

!+o::Send ^+{n}
Return
}

; ----- telegram ---------

#IfWinActive ahk_exe Telegram.exe
{
^!z::Send {Ctrl Down}{w}{Ctrl Up}
Return
}

#IfWinActive

^!z::Run "C:\Users\who\AppData\Roaming\Telegram Desktop\Telegram.exe"
Return
```

## 尾声

以上配置的内容实际上很少，操作方法也非常简单，因此未写出具体实现步骤。

配置好以后并不产生新的学习成本（如果你熟悉 vim 的话），也不增加心智负担。

有这么多强大的软件，当然也还可以再进一步地提升双系统的使用效率啦，这个留待下次有机会再写吧 🤓 。

## 推荐阅读 & 参考

- [Karabiner-Elements 之 介绍和使用（part 1）](https://cloud.tencent.com/developer/article/1873835)
- [【AutoHotkey】windows和mac统一映射方案](https://www.mdnice.com/writing/4223f9ad2f6f415d9907d8266e85fc4e)
