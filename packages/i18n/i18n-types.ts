// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales =
	| 'en'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	main: {
		tab: {
			/**
			 * Add a game
			 */
			add: string
		}
		head: {
			/**
			 * Enable sound
			 */
			'toggle-audio-on': string
			/**
			 * Mute
			 */
			'toggle-audio-off': string
			/**
			 * Open a new window
			 */
			'new-window': string
		}
		prompt: {
			'tabs-overflow': {
				/**
				 * Lindo doesn't support more than 6 tab per window, above that it can be laggy and buggy. But you can open a new window and it will be working just fine.
				 */
				text: string
			}
		}
	}
	notifications: {
		/**
		 * Starting turn for {characterName}
		 * @param {string} characterName
		 */
		fightTurn: RequiredParams<'characterName'>
		/**
		 * Incoming message from {senderName}
		 * @param {string} senderName
		 */
		privateMessage: RequiredParams<'senderName'>
		/**
		 * A tax collector is being attacked !
		 */
		taxCollector: string
		/**
		 * A Kolizeum has been found !
		 */
		kolizeum: string
		/**
		 * You are invited to join {senderName}'s group.
		 * @param {string} senderName
		 */
		partyInvitation: RequiredParams<'senderName'>
		/**
		 * You have been aggressed !
		 */
		aggression: string
		/**
		 * Bank
		 */
		saleMessage: string
	}
	window: {
		changelog: {
			/**
			 * Release notes
			 */
			title: string
			/**
			 * Release
			 */
			prefix: string
		}
		'master-password': {
			/**
			 * Continue
			 */
			'continue': string
			/**
			 * Skip this step
			 */
			skip: string
			/**
			 * Enter the master password
			 */
			'password-label': string
			/**
			 * The password is incorrect
			 */
			'password-bad': string
		}
		updateGame: {
			/**
			 * Lindo update
			 */
			title: string
			/**
			 * Preparing update..
			 */
			step0: string
			/**
			 * Step 1 : Downloading Dofus files
			 */
			step1: string
			/**
			 * Step 2 : Lindo patch download
			 */
			step2: string
			/**
			 * Step 3 : Version resolution
			 */
			step3: string
			/**
			 * Step 4 : Applying the patches
			 */
			step4: string
			/**
			 * Step 5 : Writing modified files
			 */
			step5: string
			/**
			 * Step 6 : Delete old files
			 */
			step6: string
			/**
			 * Step 7 : Finalization
			 */
			step7: string
			/**
			 * Step 8 : Launch of Lindo..
			 */
			step8: string
			information: {
				/**
				 * Looking for updates...
				 */
				search: string
				/**
				 * Can't download the update ! Please try again later
				 */
				error: string
				/**
				 * Try again
				 */
				retry: string
			}
		}
		options: {
			/**
			 * Options
			 */
			title: string
			button: {
				/**
				 * Completed
				 */
				close: string
			}
		}
		bugReport: {
			/**
			 * Report a bug
			 */
			title: string
			/**
			 * If you've observed an unexpected behavior on Lindo, you can report it by describing it below.
			 */
			description: string
			/**
			 * Please provide at least these information:
			 */
			instructions: string
			list: {
				/**
				 * The unexpected behavior description
				 */
				'1': string
				/**
				 * How to reproduce it
				 */
				'2': string
				/**
				 * What would the usual expected behavior be
				 */
				'3': string
			}
			/**
			 * Description
			 */
			placeholder: string
			/**
			 * Send
			 */
			send: string
		}
	}
	option: {
		vip: {
			'multi-account': {
				/**
				 * To use this feature, a password must be configured. It will be used to start Lindo with multi-account automation.
				 */
				'home-no-master': string
				/**
				 * Multi accounts
				 */
				header: string
				/**
				 * Enable multi accounts
				 */
				active: string
				/**
				 * Window
				 */
				window: string
				/**
				 * Delete
				 */
				'delete-window': string
				/**
				 * Add a window
				 */
				'add-window': string
				/**
				 * Add an account
				 */
				add: string
				/**
				 * Username
				 */
				'account-name': string
				/**
				 * Password
				 */
				password: string
				/**
				 * Change the password
				 */
				modify_password: string
				/**
				 * Setting password
				 */
				configure_password: string
				/**
				 * Removing the password
				 */
				delete_password: string
				'request-master-password': {
					/**
					 * To access your account management, you must first enter your master password. This password was set on the first activation of the multi-account.
					 */
					explanation: string
					/**
					 * Enter your password
					 */
					label: string
					/**
					 * The password is incorrect
					 */
					bad: string
					/**
					 * Carry on
					 */
					confirm: string
					/**
					 * Skip this step
					 */
					'ignore-step': string
				}
				prompt: {
					'add-master': {
						/**
						 * Setting the Password
						 */
						title: string
						/**
						 * Save
						 */
						confirm: string
						/**
						 * Cancel
						 */
						cancel: string
						/**
						 * The password must contain at least length}} characters
						 */
						'min-length': string
						/**
						 * The password will now be used to start the application.
						 */
						'success-text': string
					}
					'edit-master': {
						/**
						 * Changing the password
						 */
						title: string
						/**
						 * Old password
						 */
						'input-old-placeholder': string
						/**
						 * New password
						 */
						'input-new-placeholder': string
						/**
						 * Save
						 */
						confirm: string
						/**
						 * Cancel
						 */
						cancel: string
						/**
						 * The new password must contain at least {length} characters
						 * @param {number} length
						 */
						'min-length': RequiredParams<'length'>
						/**
						 * The old password is incorrect
						 */
						'incorrect-old': string
						/**
						 * The password has been changed.
						 */
						'success-text': string
					}
					'delete-master': {
						/**
						 * Removing the password
						 */
						title: string
						/**
						 * Are you sure?<br/>This will delete the saved accounts.
						 */
						text: string
						/**
						 * Remove
						 */
						confirm: string
						/**
						 * Cancel
						 */
						cancel: string
						/**
						 * The password has been deleted.
						 */
						'success-text': string
					}
					'maximum-account': {
						/**
						 * Oops!
						 */
						title: string
						/**
						 * You can not save more than 4 accounts without Wabbit donor rank.
						 */
						text: string
						/**
						 * Increase my VIP rank
						 */
						confirm: string
						/**
						 * I understood
						 */
						cancel: string
					}
					'add-account': {
						/**
						 * Adding an account
						 */
						title: string
						/**
						 * Username
						 */
						'input-login-placeholder': string
						/**
						 * Password
						 */
						'input-password-placeholder': string
						/**
						 * Save
						 */
						confirm: string
						/**
						 * Cancel
						 */
						cancel: string
						/**
						 * The username must contain at least 1 character
						 */
						'min-length-login': string
						/**
						 * The password must contain at least 1 character
						 */
						'min-length-password': string
					}
					'edit-account': {
						/**
						 * Changing an account
						 */
						title: string
						/**
						 * Username
						 */
						'input-login-placeholder': string
						/**
						 * Password
						 */
						'input-password-placeholder': string
						/**
						 * Save
						 */
						confirm: string
						/**
						 * Cancel
						 */
						cancel: string
						/**
						 * The username must contain at least 1 character
						 */
						'min-length-login': string
						/**
						 * The password must contain at least 1 character
						 */
						'min-length-password': string
					}
				}
			}
			zaapSearchFilter: {
				/**
				 * Search a zaap
				 */
				placeholder: string
				/**
				 * Search a zaapi
				 */
				placeholderZaapi: string
				/**
				 * Search a prisme
				 */
				placeholderPrisme: string
			}
			jobsXp: {
				/**
				 *  XP missing<br>before level 
				 */
				text: string
			}
			monsterTooltip: {
				/**
				 * Level
				 */
				level: string
				/**
				 * Group
				 */
				group: string
			}
		}
		general: {
			/**
			 * General
			 */
			title: string
			/**
			 * Interface
			 */
			'interface': string
			/**
			 * Sound
			 */
			sound: string
			/**
			 * Game data
			 */
			gameData: string
			/**
			 * Language
			 */
			language: string
			/**
			 * Resolution
			 */
			resolution: string
			/**
			 * Full screen
			 */
			fullScreen: string
			/**
			 * Hide the multi-account tab bar
			 */
			hideTab: string
			/**
			 * Enable local map download (beta)
			 */
			localContent: string
			/**
			 * Game sound only on foreground window
			 */
			soundFocus: string
			/**
			 * Play on Dofus Touch Early
			 */
			early: string
			/**
			 * Apply and restart
			 */
			restart: string
			/**
			 * Re-download game data
			 */
			resetGame: string
			/**
			 * Clear cache
			 */
			clearCache: string
		}
		shortcuts: {
			/**
			 * Shortcuts
			 */
			title: string
			diver: {
				/**
				 * Miscellaneous
				 */
				header: string
				/**
				 * End your turn / Ready (fight)
				 */
				endTurn: string
				/**
				 * Open the chat
				 */
				openChat: string
				/**
				 * Open the menu
				 */
				openMenu: string
				/**
				 * Go to Upper Map
				 */
				goUp: string
				/**
				 * Go to Lower Map
				 */
				goDown: string
				/**
				 * Go to Left Map
				 */
				goLeft: string
				/**
				 * Go to Right Map
				 */
				goRight: string
			}
			interfaces: {
				/**
				 * Interfaces
				 */
				header: string
				/**
				 * Character
				 */
				carac: string
				/**
				 * Spells
				 */
				spell: string
				/**
				 * Inventory
				 */
				bag: string
				/**
				 * Market place
				 */
				bidHouse: string
				/**
				 * Map
				 */
				map: string
				/**
				 * Friends
				 */
				friend: string
				/**
				 * Quests
				 */
				book: string
				/**
				 * Guild
				 */
				guild: string
				/**
				 * Kolizeum
				 */
				conquest: string
				/**
				 * Shop
				 */
				goultine: string
				/**
				 * Jobs
				 */
				job: string
				/**
				 * Alliance
				 */
				alliance: string
				/**
				 * Mount
				 */
				mount: string
				/**
				 * List of Guilds and Alliances
				 */
				directory: string
				/**
				 * Alignment
				 */
				alignment: string
				/**
				 * Bestiary
				 */
				bestiary: string
				/**
				 * Titles and Ornaments
				 */
				title: string
				/**
				 * Achievements
				 */
				achievement: string
				/**
				 * Daily Quests
				 */
				dailyQuest: string
				/**
				 * Spouse
				 */
				spouse: string
				/**
				 * Shopkeeper
				 */
				shop: string
			}
			items: {
				/**
				 * Items
				 */
				header: string
				/**
				 * Slot {x}
				 * @param {number} x
				 */
				slot: RequiredParams<'x'>
			}
			application: {
				/**
				 * Application
				 */
				header: string
				/**
				 * New window
				 */
				newWindow: string
				/**
				 * New tab
				 */
				newTab: string
				/**
				 * Tab {x}
				 * @param {number} x
				 */
				tab: RequiredParams<'x'>
				/**
				 * Next tab
				 */
				nextTab: string
				/**
				 * Previous tab
				 */
				prevTab: string
			}
			spells: {
				/**
				 * Spells
				 */
				header: string
				/**
				 * Slot {x}
				 * @param {number} x
				 */
				slot: RequiredParams<'x'>
			}
			mods: {
				/**
				 * Mods
				 */
				header: string
				/**
				 * Show/hide map resources
				 */
				'show-resources': string
				/**
				 * Show/hide life bars
				 */
				'health-bar': string
				/**
				 * Show/hide monsters tooltip
				 */
				'monster-tooltip': string
			}
			/**
			 * You can use special keys CTRL, SHIFT, SPACE, ALT/CMD You can specify your shortcut by pressing the desired keys at the same time after selecting the input
			 */
			information: string
		}
		features: {
			/**
			 * Features
			 */
			title: string
			general: {
				/**
				 * General
				 */
				header: string
				/**
				 * Hide the Shop button
				 */
				hideShop: string
				/**
				 * Open menu when no window is open (ESC)
				 */
				activeOpenMenu: string
				/**
				 * Extend the delay before disconnection for inactivity
				 */
				disableInactivity: string
				/**
				 * Activate the display of the job xp need for leveling
				 */
				jobsXp: string
				/**
				 * Show zaap search filter
				 */
				zaapSearchFilter: string
				/**
				 * Show map resources
				 */
				showResources: string
				/**
				 * Activate the display of the remaining time below the resources
				 */
				harvestIndicator: string
			}
			fight: {
				/**
				 * Fight
				 */
				header: string
				/**
				 * Activate the display of the life bars below the fighters
				 */
				healthBar: string
				/**
				 * Automatically switch to an account when its turn starts
				 */
				focusFightTurn: string
				/**
				 * Estimating spell damage in battle
				 */
				estimator: string
				/**
				 * Show combats chronometer
				 */
				fightChronometer: string
				/**
				 * Display monsters groups information on the map
				 */
				monsterTooltip: string
				/**
				 * Shortcut for show/hide monsters tooltip
				 */
				monsterTooltipShortcut: string
				/**
				 * Show fighters timeline vertically
				 */
				verticalTimeline: string
				/**
				 * Show challenge XP/Drop bonus
				 */
				challengePercent: string
			}
			group: {
				/**
				 * Group
				 */
				header: string
				/**
				 * Add an indicator to know if the members of a group are on the same map
				 */
				partyMemberOnMap: string
				partyInfo: {
					/**
					 * Show party's level
					 */
					level: string
					/**
					 * Show party's prospecting
					 */
					prospecting: string
				}
				autoGroup: {
					/**
					 * Auto Group
					 */
					header: string
					/**
					 * Enable automatic grouping
					 */
					active: string
					/**
					 * Beware, following the group leader can be considered as boting for other players, use it with caution and in unpopulated areas.
					 */
					warning: string
					/**
					 * Beware, This feature can be considered as boting for other players, use it with caution and in unpopulated areas.
					 */
					warningTimer: string
					/**
					 * The characters in the group must be friends with the leader so that the invitation is automatic.
					 */
					explanation1: string
					/**
					 * The members follow the leader if the latter is on the same map.
					 */
					explanation2: string
					/**
					 * Name of leader
					 */
					leader: string
					/**
					 * Names of characters
					 */
					members: string
					/**
					 * Add a character
					 */
					addMember: string
					/**
					 * Follow the group leader
					 */
					followLeader: string
					/**
					 * Disable the Timer for the auto group
					 */
					disableTimer: string
					/**
					 * Skip "ready" automatically
					 */
					ready: string
					/**
					 * Enter combat automatically
					 */
					fight: string
					/**
					 * Time to follow (in seconds)
					 */
					delay: string
					/**
					 * Follow the leader on a map
					 */
					followOnMap: string
					/**
					 * Move on the same cell the leader moves
					 */
					strictMove: string
					/**
					 * You can't join a PvP fight automatically
					 */
					pvpWarning: string
				}
			}
			job: {
				/**
				 * Job
				 */
				header: string
			}
			accounts: {
				/**
				 * Accounts
				 */
				header: string
			}
		}
		notifications: {
			/**
			 * Notifications
			 */
			title: string
			/**
			 * You can receive notifications from the game when the application is on the background. You will be notified:
			 */
			description: string
			/**
			 * When your turn starts (fight)
			 */
			fightTurn: string
			/**
			 * By incoming private messages
			 */
			privateMessage: string
			/**
			 * When a tax collector is attacked
			 */
			'tax-collector': string
			/**
			 * When a kolizeum fight is found
			 */
			kolizeum: string
			/**
			 * When someone invites you to join a group
			 */
			'party-invitation': string
			/**
			 * When someone aggresses you
			 */
			aggression: string
			/**
			 * When an item is sold
			 */
			'sale-message': string
		}
		about: {
			/**
			 * About
			 */
			title: string
			links: {
				/**
				 * Website
				 */
				website: string
				/**
				 * Release notes
				 */
				changelog: string
			}
			/**
			 * Lindo is an open-source software that allows you to play DOFUS Touch from your computer.
			 */
			text0: string
			/**
			 * Unlike an Android emulator, the code is directly interpreted by your computer, which makes it faster so you can play DOFUS Touch with the full performance of your computer !
			 */
			text1: string
			/**
			 * Originally known as DOFUS Touch No-Emu, this software developed by Daniel and Thomas was forced to close cause of an advertisement from Ankama.
			 */
			text2: string
		}
		/**
		 * Reset
		 */
		reset: string
		/**
		 * Apply
		 */
		save: string
		prompt: {
			'reset-option': {
				/**
				 * By continuing, all parameters will be reset.<br/>This operation is not reversible.
				 */
				text: string
			}
		}
	}
	prompt: {
		title: {
			/**
			 * Confirmation required
			 */
			confirm: string
			/**
			 * Warning !
			 */
			warning: string
			/**
			 * Successful operation !
			 */
			success: string
			/**
			 * Operation failed !
			 */
			error: string
			/**
			 * Information
			 */
			info: string
		}
		button: {
			/**
			 * Cancel
			 */
			cancel: string
			/**
			 * I confirm
			 */
			confirm: string
			/**
			 * Close
			 */
			close: string
		}
	}
}

export type TranslationFunctions = {
	main: {
		tab: {
			/**
			 * Add a game
			 */
			add: () => LocalizedString
		}
		head: {
			/**
			 * Enable sound
			 */
			'toggle-audio-on': () => LocalizedString
			/**
			 * Mute
			 */
			'toggle-audio-off': () => LocalizedString
			/**
			 * Open a new window
			 */
			'new-window': () => LocalizedString
		}
		prompt: {
			'tabs-overflow': {
				/**
				 * Lindo doesn't support more than 6 tab per window, above that it can be laggy and buggy. But you can open a new window and it will be working just fine.
				 */
				text: () => LocalizedString
			}
		}
	}
	notifications: {
		/**
		 * Starting turn for {characterName}
		 */
		fightTurn: (arg: { characterName: string }) => LocalizedString
		/**
		 * Incoming message from {senderName}
		 */
		privateMessage: (arg: { senderName: string }) => LocalizedString
		/**
		 * A tax collector is being attacked !
		 */
		taxCollector: () => LocalizedString
		/**
		 * A Kolizeum has been found !
		 */
		kolizeum: () => LocalizedString
		/**
		 * You are invited to join {senderName}'s group.
		 */
		partyInvitation: (arg: { senderName: string }) => LocalizedString
		/**
		 * You have been aggressed !
		 */
		aggression: () => LocalizedString
		/**
		 * Bank
		 */
		saleMessage: () => LocalizedString
	}
	window: {
		changelog: {
			/**
			 * Release notes
			 */
			title: () => LocalizedString
			/**
			 * Release
			 */
			prefix: () => LocalizedString
		}
		'master-password': {
			/**
			 * Continue
			 */
			'continue': () => LocalizedString
			/**
			 * Skip this step
			 */
			skip: () => LocalizedString
			/**
			 * Enter the master password
			 */
			'password-label': () => LocalizedString
			/**
			 * The password is incorrect
			 */
			'password-bad': () => LocalizedString
		}
		updateGame: {
			/**
			 * Lindo update
			 */
			title: () => LocalizedString
			/**
			 * Preparing update..
			 */
			step0: () => LocalizedString
			/**
			 * Step 1 : Downloading Dofus files
			 */
			step1: () => LocalizedString
			/**
			 * Step 2 : Lindo patch download
			 */
			step2: () => LocalizedString
			/**
			 * Step 3 : Version resolution
			 */
			step3: () => LocalizedString
			/**
			 * Step 4 : Applying the patches
			 */
			step4: () => LocalizedString
			/**
			 * Step 5 : Writing modified files
			 */
			step5: () => LocalizedString
			/**
			 * Step 6 : Delete old files
			 */
			step6: () => LocalizedString
			/**
			 * Step 7 : Finalization
			 */
			step7: () => LocalizedString
			/**
			 * Step 8 : Launch of Lindo..
			 */
			step8: () => LocalizedString
			information: {
				/**
				 * Looking for updates...
				 */
				search: () => LocalizedString
				/**
				 * Can't download the update ! Please try again later
				 */
				error: () => LocalizedString
				/**
				 * Try again
				 */
				retry: () => LocalizedString
			}
		}
		options: {
			/**
			 * Options
			 */
			title: () => LocalizedString
			button: {
				/**
				 * Completed
				 */
				close: () => LocalizedString
			}
		}
		bugReport: {
			/**
			 * Report a bug
			 */
			title: () => LocalizedString
			/**
			 * If you've observed an unexpected behavior on Lindo, you can report it by describing it below.
			 */
			description: () => LocalizedString
			/**
			 * Please provide at least these information:
			 */
			instructions: () => LocalizedString
			list: {
				/**
				 * The unexpected behavior description
				 */
				'1': () => LocalizedString
				/**
				 * How to reproduce it
				 */
				'2': () => LocalizedString
				/**
				 * What would the usual expected behavior be
				 */
				'3': () => LocalizedString
			}
			/**
			 * Description
			 */
			placeholder: () => LocalizedString
			/**
			 * Send
			 */
			send: () => LocalizedString
		}
	}
	option: {
		vip: {
			'multi-account': {
				/**
				 * To use this feature, a password must be configured. It will be used to start Lindo with multi-account automation.
				 */
				'home-no-master': () => LocalizedString
				/**
				 * Multi accounts
				 */
				header: () => LocalizedString
				/**
				 * Enable multi accounts
				 */
				active: () => LocalizedString
				/**
				 * Window
				 */
				window: () => LocalizedString
				/**
				 * Delete
				 */
				'delete-window': () => LocalizedString
				/**
				 * Add a window
				 */
				'add-window': () => LocalizedString
				/**
				 * Add an account
				 */
				add: () => LocalizedString
				/**
				 * Username
				 */
				'account-name': () => LocalizedString
				/**
				 * Password
				 */
				password: () => LocalizedString
				/**
				 * Change the password
				 */
				modify_password: () => LocalizedString
				/**
				 * Setting password
				 */
				configure_password: () => LocalizedString
				/**
				 * Removing the password
				 */
				delete_password: () => LocalizedString
				'request-master-password': {
					/**
					 * To access your account management, you must first enter your master password. This password was set on the first activation of the multi-account.
					 */
					explanation: () => LocalizedString
					/**
					 * Enter your password
					 */
					label: () => LocalizedString
					/**
					 * The password is incorrect
					 */
					bad: () => LocalizedString
					/**
					 * Carry on
					 */
					confirm: () => LocalizedString
					/**
					 * Skip this step
					 */
					'ignore-step': () => LocalizedString
				}
				prompt: {
					'add-master': {
						/**
						 * Setting the Password
						 */
						title: () => LocalizedString
						/**
						 * Save
						 */
						confirm: () => LocalizedString
						/**
						 * Cancel
						 */
						cancel: () => LocalizedString
						/**
						 * The password must contain at least length}} characters
						 */
						'min-length': () => LocalizedString
						/**
						 * The password will now be used to start the application.
						 */
						'success-text': () => LocalizedString
					}
					'edit-master': {
						/**
						 * Changing the password
						 */
						title: () => LocalizedString
						/**
						 * Old password
						 */
						'input-old-placeholder': () => LocalizedString
						/**
						 * New password
						 */
						'input-new-placeholder': () => LocalizedString
						/**
						 * Save
						 */
						confirm: () => LocalizedString
						/**
						 * Cancel
						 */
						cancel: () => LocalizedString
						/**
						 * The new password must contain at least {length} characters
						 */
						'min-length': (arg: { length: number }) => LocalizedString
						/**
						 * The old password is incorrect
						 */
						'incorrect-old': () => LocalizedString
						/**
						 * The password has been changed.
						 */
						'success-text': () => LocalizedString
					}
					'delete-master': {
						/**
						 * Removing the password
						 */
						title: () => LocalizedString
						/**
						 * Are you sure?<br/>This will delete the saved accounts.
						 */
						text: () => LocalizedString
						/**
						 * Remove
						 */
						confirm: () => LocalizedString
						/**
						 * Cancel
						 */
						cancel: () => LocalizedString
						/**
						 * The password has been deleted.
						 */
						'success-text': () => LocalizedString
					}
					'maximum-account': {
						/**
						 * Oops!
						 */
						title: () => LocalizedString
						/**
						 * You can not save more than 4 accounts without Wabbit donor rank.
						 */
						text: () => LocalizedString
						/**
						 * Increase my VIP rank
						 */
						confirm: () => LocalizedString
						/**
						 * I understood
						 */
						cancel: () => LocalizedString
					}
					'add-account': {
						/**
						 * Adding an account
						 */
						title: () => LocalizedString
						/**
						 * Username
						 */
						'input-login-placeholder': () => LocalizedString
						/**
						 * Password
						 */
						'input-password-placeholder': () => LocalizedString
						/**
						 * Save
						 */
						confirm: () => LocalizedString
						/**
						 * Cancel
						 */
						cancel: () => LocalizedString
						/**
						 * The username must contain at least 1 character
						 */
						'min-length-login': () => LocalizedString
						/**
						 * The password must contain at least 1 character
						 */
						'min-length-password': () => LocalizedString
					}
					'edit-account': {
						/**
						 * Changing an account
						 */
						title: () => LocalizedString
						/**
						 * Username
						 */
						'input-login-placeholder': () => LocalizedString
						/**
						 * Password
						 */
						'input-password-placeholder': () => LocalizedString
						/**
						 * Save
						 */
						confirm: () => LocalizedString
						/**
						 * Cancel
						 */
						cancel: () => LocalizedString
						/**
						 * The username must contain at least 1 character
						 */
						'min-length-login': () => LocalizedString
						/**
						 * The password must contain at least 1 character
						 */
						'min-length-password': () => LocalizedString
					}
				}
			}
			zaapSearchFilter: {
				/**
				 * Search a zaap
				 */
				placeholder: () => LocalizedString
				/**
				 * Search a zaapi
				 */
				placeholderZaapi: () => LocalizedString
				/**
				 * Search a prisme
				 */
				placeholderPrisme: () => LocalizedString
			}
			jobsXp: {
				/**
				 *  XP missing<br>before level 
				 */
				text: () => LocalizedString
			}
			monsterTooltip: {
				/**
				 * Level
				 */
				level: () => LocalizedString
				/**
				 * Group
				 */
				group: () => LocalizedString
			}
		}
		general: {
			/**
			 * General
			 */
			title: () => LocalizedString
			/**
			 * Interface
			 */
			'interface': () => LocalizedString
			/**
			 * Sound
			 */
			sound: () => LocalizedString
			/**
			 * Game data
			 */
			gameData: () => LocalizedString
			/**
			 * Language
			 */
			language: () => LocalizedString
			/**
			 * Resolution
			 */
			resolution: () => LocalizedString
			/**
			 * Full screen
			 */
			fullScreen: () => LocalizedString
			/**
			 * Hide the multi-account tab bar
			 */
			hideTab: () => LocalizedString
			/**
			 * Enable local map download (beta)
			 */
			localContent: () => LocalizedString
			/**
			 * Game sound only on foreground window
			 */
			soundFocus: () => LocalizedString
			/**
			 * Play on Dofus Touch Early
			 */
			early: () => LocalizedString
			/**
			 * Apply and restart
			 */
			restart: () => LocalizedString
			/**
			 * Re-download game data
			 */
			resetGame: () => LocalizedString
			/**
			 * Clear cache
			 */
			clearCache: () => LocalizedString
		}
		shortcuts: {
			/**
			 * Shortcuts
			 */
			title: () => LocalizedString
			diver: {
				/**
				 * Miscellaneous
				 */
				header: () => LocalizedString
				/**
				 * End your turn / Ready (fight)
				 */
				endTurn: () => LocalizedString
				/**
				 * Open the chat
				 */
				openChat: () => LocalizedString
				/**
				 * Open the menu
				 */
				openMenu: () => LocalizedString
				/**
				 * Go to Upper Map
				 */
				goUp: () => LocalizedString
				/**
				 * Go to Lower Map
				 */
				goDown: () => LocalizedString
				/**
				 * Go to Left Map
				 */
				goLeft: () => LocalizedString
				/**
				 * Go to Right Map
				 */
				goRight: () => LocalizedString
			}
			interfaces: {
				/**
				 * Interfaces
				 */
				header: () => LocalizedString
				/**
				 * Character
				 */
				carac: () => LocalizedString
				/**
				 * Spells
				 */
				spell: () => LocalizedString
				/**
				 * Inventory
				 */
				bag: () => LocalizedString
				/**
				 * Market place
				 */
				bidHouse: () => LocalizedString
				/**
				 * Map
				 */
				map: () => LocalizedString
				/**
				 * Friends
				 */
				friend: () => LocalizedString
				/**
				 * Quests
				 */
				book: () => LocalizedString
				/**
				 * Guild
				 */
				guild: () => LocalizedString
				/**
				 * Kolizeum
				 */
				conquest: () => LocalizedString
				/**
				 * Shop
				 */
				goultine: () => LocalizedString
				/**
				 * Jobs
				 */
				job: () => LocalizedString
				/**
				 * Alliance
				 */
				alliance: () => LocalizedString
				/**
				 * Mount
				 */
				mount: () => LocalizedString
				/**
				 * List of Guilds and Alliances
				 */
				directory: () => LocalizedString
				/**
				 * Alignment
				 */
				alignment: () => LocalizedString
				/**
				 * Bestiary
				 */
				bestiary: () => LocalizedString
				/**
				 * Titles and Ornaments
				 */
				title: () => LocalizedString
				/**
				 * Achievements
				 */
				achievement: () => LocalizedString
				/**
				 * Daily Quests
				 */
				dailyQuest: () => LocalizedString
				/**
				 * Spouse
				 */
				spouse: () => LocalizedString
				/**
				 * Shopkeeper
				 */
				shop: () => LocalizedString
			}
			items: {
				/**
				 * Items
				 */
				header: () => LocalizedString
				/**
				 * Slot {x}
				 */
				slot: (arg: { x: number }) => LocalizedString
			}
			application: {
				/**
				 * Application
				 */
				header: () => LocalizedString
				/**
				 * New window
				 */
				newWindow: () => LocalizedString
				/**
				 * New tab
				 */
				newTab: () => LocalizedString
				/**
				 * Tab {x}
				 */
				tab: (arg: { x: number }) => LocalizedString
				/**
				 * Next tab
				 */
				nextTab: () => LocalizedString
				/**
				 * Previous tab
				 */
				prevTab: () => LocalizedString
			}
			spells: {
				/**
				 * Spells
				 */
				header: () => LocalizedString
				/**
				 * Slot {x}
				 */
				slot: (arg: { x: number }) => LocalizedString
			}
			mods: {
				/**
				 * Mods
				 */
				header: () => LocalizedString
				/**
				 * Show/hide map resources
				 */
				'show-resources': () => LocalizedString
				/**
				 * Show/hide life bars
				 */
				'health-bar': () => LocalizedString
				/**
				 * Show/hide monsters tooltip
				 */
				'monster-tooltip': () => LocalizedString
			}
			/**
			 * You can use special keys CTRL, SHIFT, SPACE, ALT/CMD You can specify your shortcut by pressing the desired keys at the same time after selecting the input
			 */
			information: () => LocalizedString
		}
		features: {
			/**
			 * Features
			 */
			title: () => LocalizedString
			general: {
				/**
				 * General
				 */
				header: () => LocalizedString
				/**
				 * Hide the Shop button
				 */
				hideShop: () => LocalizedString
				/**
				 * Open menu when no window is open (ESC)
				 */
				activeOpenMenu: () => LocalizedString
				/**
				 * Extend the delay before disconnection for inactivity
				 */
				disableInactivity: () => LocalizedString
				/**
				 * Activate the display of the job xp need for leveling
				 */
				jobsXp: () => LocalizedString
				/**
				 * Show zaap search filter
				 */
				zaapSearchFilter: () => LocalizedString
				/**
				 * Show map resources
				 */
				showResources: () => LocalizedString
				/**
				 * Activate the display of the remaining time below the resources
				 */
				harvestIndicator: () => LocalizedString
			}
			fight: {
				/**
				 * Fight
				 */
				header: () => LocalizedString
				/**
				 * Activate the display of the life bars below the fighters
				 */
				healthBar: () => LocalizedString
				/**
				 * Automatically switch to an account when its turn starts
				 */
				focusFightTurn: () => LocalizedString
				/**
				 * Estimating spell damage in battle
				 */
				estimator: () => LocalizedString
				/**
				 * Show combats chronometer
				 */
				fightChronometer: () => LocalizedString
				/**
				 * Display monsters groups information on the map
				 */
				monsterTooltip: () => LocalizedString
				/**
				 * Shortcut for show/hide monsters tooltip
				 */
				monsterTooltipShortcut: () => LocalizedString
				/**
				 * Show fighters timeline vertically
				 */
				verticalTimeline: () => LocalizedString
				/**
				 * Show challenge XP/Drop bonus
				 */
				challengePercent: () => LocalizedString
			}
			group: {
				/**
				 * Group
				 */
				header: () => LocalizedString
				/**
				 * Add an indicator to know if the members of a group are on the same map
				 */
				partyMemberOnMap: () => LocalizedString
				partyInfo: {
					/**
					 * Show party's level
					 */
					level: () => LocalizedString
					/**
					 * Show party's prospecting
					 */
					prospecting: () => LocalizedString
				}
				autoGroup: {
					/**
					 * Auto Group
					 */
					header: () => LocalizedString
					/**
					 * Enable automatic grouping
					 */
					active: () => LocalizedString
					/**
					 * Beware, following the group leader can be considered as boting for other players, use it with caution and in unpopulated areas.
					 */
					warning: () => LocalizedString
					/**
					 * Beware, This feature can be considered as boting for other players, use it with caution and in unpopulated areas.
					 */
					warningTimer: () => LocalizedString
					/**
					 * The characters in the group must be friends with the leader so that the invitation is automatic.
					 */
					explanation1: () => LocalizedString
					/**
					 * The members follow the leader if the latter is on the same map.
					 */
					explanation2: () => LocalizedString
					/**
					 * Name of leader
					 */
					leader: () => LocalizedString
					/**
					 * Names of characters
					 */
					members: () => LocalizedString
					/**
					 * Add a character
					 */
					addMember: () => LocalizedString
					/**
					 * Follow the group leader
					 */
					followLeader: () => LocalizedString
					/**
					 * Disable the Timer for the auto group
					 */
					disableTimer: () => LocalizedString
					/**
					 * Skip "ready" automatically
					 */
					ready: () => LocalizedString
					/**
					 * Enter combat automatically
					 */
					fight: () => LocalizedString
					/**
					 * Time to follow (in seconds)
					 */
					delay: () => LocalizedString
					/**
					 * Follow the leader on a map
					 */
					followOnMap: () => LocalizedString
					/**
					 * Move on the same cell the leader moves
					 */
					strictMove: () => LocalizedString
					/**
					 * You can't join a PvP fight automatically
					 */
					pvpWarning: () => LocalizedString
				}
			}
			job: {
				/**
				 * Job
				 */
				header: () => LocalizedString
			}
			accounts: {
				/**
				 * Accounts
				 */
				header: () => LocalizedString
			}
		}
		notifications: {
			/**
			 * Notifications
			 */
			title: () => LocalizedString
			/**
			 * You can receive notifications from the game when the application is on the background. You will be notified:
			 */
			description: () => LocalizedString
			/**
			 * When your turn starts (fight)
			 */
			fightTurn: () => LocalizedString
			/**
			 * By incoming private messages
			 */
			privateMessage: () => LocalizedString
			/**
			 * When a tax collector is attacked
			 */
			'tax-collector': () => LocalizedString
			/**
			 * When a kolizeum fight is found
			 */
			kolizeum: () => LocalizedString
			/**
			 * When someone invites you to join a group
			 */
			'party-invitation': () => LocalizedString
			/**
			 * When someone aggresses you
			 */
			aggression: () => LocalizedString
			/**
			 * When an item is sold
			 */
			'sale-message': () => LocalizedString
		}
		about: {
			/**
			 * About
			 */
			title: () => LocalizedString
			links: {
				/**
				 * Website
				 */
				website: () => LocalizedString
				/**
				 * Release notes
				 */
				changelog: () => LocalizedString
			}
			/**
			 * Lindo is an open-source software that allows you to play DOFUS Touch from your computer.
			 */
			text0: () => LocalizedString
			/**
			 * Unlike an Android emulator, the code is directly interpreted by your computer, which makes it faster so you can play DOFUS Touch with the full performance of your computer !
			 */
			text1: () => LocalizedString
			/**
			 * Originally known as DOFUS Touch No-Emu, this software developed by Daniel and Thomas was forced to close cause of an advertisement from Ankama.
			 */
			text2: () => LocalizedString
		}
		/**
		 * Reset
		 */
		reset: () => LocalizedString
		/**
		 * Apply
		 */
		save: () => LocalizedString
		prompt: {
			'reset-option': {
				/**
				 * By continuing, all parameters will be reset.<br/>This operation is not reversible.
				 */
				text: () => LocalizedString
			}
		}
	}
	prompt: {
		title: {
			/**
			 * Confirmation required
			 */
			confirm: () => LocalizedString
			/**
			 * Warning !
			 */
			warning: () => LocalizedString
			/**
			 * Successful operation !
			 */
			success: () => LocalizedString
			/**
			 * Operation failed !
			 */
			error: () => LocalizedString
			/**
			 * Information
			 */
			info: () => LocalizedString
		}
		button: {
			/**
			 * Cancel
			 */
			cancel: () => LocalizedString
			/**
			 * I confirm
			 */
			confirm: () => LocalizedString
			/**
			 * Close
			 */
			close: () => LocalizedString
		}
	}
}

export type Formatters = {}
