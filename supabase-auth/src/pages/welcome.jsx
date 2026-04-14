import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function WelcomePage() {
  const { user, loading, signOut } = useAuth()
  const navigate = useNavigate()
  const [hoveredTx, setHoveredTx] = useState(null)
  const [hoveredBtn, setHoveredBtn] = useState(null)
  const [hoveredCard, setHoveredCard] = useState(null)

  useEffect(() => {
    if (!loading && !user) navigate('/')
  }, [user, loading, navigate])

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  if (loading) return null

  const transactions = [
    { id: 1, label: 'Salary Deposit', amount: '8,200.00', date: 'Apr 1, 2026', positive: true, category: 'Income' },
    { id: 2, label: 'Netflix', amount: '15.99', date: 'Apr 3, 2026', positive: false, category: 'Subscription' },
    { id: 3, label: 'Freelance Payment', amount: '1,200.00', date: 'Apr 5, 2026', positive: true, category: 'Income' },
    { id: 4, label: 'Grocery Store', amount: '94.50', date: 'Apr 7, 2026', positive: false, category: 'Food' },
    { id: 5, label: 'Dividend Payout', amount: '320.00', date: 'Apr 10, 2026', positive: true, category: 'Investments' },
    { id: 6, label: 'Electric Bill', amount: '87.00', date: 'Apr 12, 2026', positive: false, category: 'Utilities' },
  ]

  const stats = [
    { label: 'Income', value: '$8,200', sub: '↑ this month', color: '#007c6e' },
    { label: 'Expenses', value: '$3,809', sub: '↓ this month', color: '#ef4444' },
    { label: 'Savings', value: '$4,391', sub: '12% saved', color: '#007c6e' },
  ]

  const monthlyBars = [12, 28, 45, 18, 36, 62, 22, 41, 76, 18, 82, 49]

  const navItems = [
    { id: 'home', icon: '⌂', active: true },
    { id: 'cards', icon: '▦', active: false },
    { id: 'history', icon: '▤', active: false },
    { id: 'wallet', icon: '◫', active: false },
    { id: 'settings', icon: '⚙', active: false },
  ]

  const actions = [
    { id: 'send', icon: '↗', label: 'Send' },
    { id: 'receive', icon: '↙', label: 'Receive' },
    { id: 'topup', icon: '+', label: 'Top Up' },
    
  ]

  return (
    <div className="welcome-page">
      <style>{css}</style>

      <div className="welcome-frame">
        <aside className="welcome-sidebar">
          <div className="welcome-sidebarTop">
            <button className="welcome-menuButton" type="button">
              ☰
            </button>
          </div>

          <div className="welcome-sidebarNav">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`welcome-sideNavItem ${item.active ? 'is-active' : ''}`}
              >
                {item.icon}
              </button>
            ))}
          </div>

          <div className="welcome-sidebarBottom">
            <div className="welcome-smallAvatar">{user?.email?.[0]?.toUpperCase() || 'U'}</div>
          </div>
        </aside>

        <main className="welcome-main">
          <div className="welcome-topHeader">
            <div className="welcome-breadcrumb">
              <span className="welcome-breadcrumbActive">Dashboard</span>
              <span className="welcome-breadcrumbMuted">Welcome user</span>
            </div>

            <div className="welcome-headerRight">
              <span className="welcome-timeText">10:33, 01 April 2026</span>
              <button
                onClick={handleSignOut}
                onMouseEnter={() => setHoveredBtn('signout')}
                onMouseLeave={() => setHoveredBtn(null)}
                className={`welcome-signOutBtn ${hoveredBtn === 'signout' ? 'is-hovered' : ''}`}
                type="button"
              >
                Sign out
              </button>
            </div>
          </div>

          <section className="welcome-topGrid">
            <div className="welcome-cardPanel">
              <div className="welcome-sectionTop">
                <h2 className="welcome-sectionTitle">My cards</h2>
                <button className="welcome-dotBtn" type="button">
                  •••
                </button>
              </div>

              <div className="welcome-cardsRow">
                <button className="welcome-addCard" type="button">
                  +
                </button>

                <div className="welcome-bankCardPrimary">
                  <div className="welcome-cardBrand">VISA</div>
                  <div className="welcome-cardAmount">$5 400.55</div>
                  <div className="welcome-cardNumber">•••• •••• •••• 4558</div>
                </div>

                <div className="welcome-bankCardSecondary">
                  <div className="welcome-cardBrandDark">VISA</div>
                  <div className="welcome-cardAmountDark">$23 400.55</div>
                  <div className="welcome-cardNumberLight">•••• •••• •••• 3225</div>
                </div>
              </div>
            </div>

            <div className="welcome-balancePanel">
              <div className="welcome-sectionTop">
                <h2 className="welcome-sectionTitle">Balance</h2>
                <button className="welcome-balanceFilter" type="button">
                  Last month ▾
                </button>
              </div>

              <div className="welcome-balanceAmount">$5 400.55</div>
              <div className="welcome-balanceCardNumber">•••• •••• •••• 4558</div>

              <div className="welcome-incomeExpenseRow">
                <div className="welcome-metricItem">
                  <div className="welcome-metricLabel">Income</div>
                  <div className="welcome-metricValuePositive">↑ + $6 320.15</div>
                </div>
                <div className="welcome-metricItem">
                  <div className="welcome-metricLabel">Expense</div>
                  <div className="welcome-metricValueNegative">↓ - $919.60</div>
                </div>
              </div>
            </div>
          </section>

          <section className="welcome-bottomGrid">
            <div className="welcome-summaryPanel">
              <div className="welcome-sectionTop">
                <h2 className="welcome-sectionTitle">Monthly summary</h2>
                <button className="welcome-linkBtn" type="button">
                  Generate report
                </button>
              </div>

              <div className="welcome-summaryContent">
                <div className="welcome-summaryTotals">
                  <div className="welcome-totalBox">
                    <div className="welcome-totalLabel">Income</div>
                    <div className="welcome-totalIncome">+ $5000.00</div>
                  </div>

                  <div className="welcome-totalDivider" />

                  <div className="welcome-totalBox">
                    <div className="welcome-totalLabel">Expense</div>
                    <div className="welcome-totalExpense">- $234.55</div>
                  </div>
                </div>

                <div className="welcome-chartWrap">
                  <div className="welcome-chartBars">
                    {monthlyBars.map((h, i) => (
                      <div key={i} className="welcome-barGroup">
                        <div className="welcome-bar" style={{ height: `${h}px` }} />
                        <div className="welcome-barLabel">{23 + i}</div>
                      </div>
                    ))}
                  </div>

                  <div className="welcome-chartFooter">
                    <span>23 - 31 Mar, 2019</span>
                    <span className="welcome-chartDots">•••</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="welcome-transactionsPanel">
              <div className="welcome-sectionTop">
                <h2 className="welcome-sectionTitle">Latest transaction</h2>
                <button className="welcome-linkBtn" type="button">
                  Check all
                </button>
              </div>

              <div className="welcome-txList">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    onMouseEnter={() => setHoveredTx(tx.id)}
                    onMouseLeave={() => setHoveredTx(null)}
                    className={`welcome-txRow ${hoveredTx === tx.id ? 'is-hovered' : ''}`}
                  >
                    <div className={`welcome-txIcon ${tx.positive ? 'positive' : 'negative'}`}>
                      {tx.positive ? '⌁' : '▣'}
                    </div>

                    <div className="welcome-txText">
                      <div className="welcome-txLabel">{tx.label}</div>
                      <div className="welcome-txCategory">{tx.category}</div>
                    </div>

                    <div className="welcome-txAmountWrap">
                      <div className={tx.positive ? 'welcome-txAmountPositive' : 'welcome-txAmountNegative'}>
                        {tx.positive ? '+' : '-'}${tx.amount}
                      </div>
                      <div className="welcome-txDate">{tx.date}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="welcome-txActions">
                {actions.map((a) => (
                  <button
                    key={a.id}
                    onMouseEnter={() => setHoveredBtn(a.id)}
                    onMouseLeave={() => setHoveredBtn(null)}
                    className={`welcome-actionBtn ${hoveredBtn === a.id ? 'is-hovered' : ''}`}
                    type="button"
                  >
                    <span className="welcome-actionIcon">{a.icon}</span>
                    <span className="welcome-actionLabel">{a.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="welcome-quickStats">
            {stats.map((c, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`welcome-statCard ${hoveredCard === i ? 'is-hovered' : ''}`}
              >
                <div className="welcome-statLabel">{c.label}</div>
                <div className="welcome-statValue">{c.value}</div>
                <div className="welcome-statSub" style={{ color: c.color }}>
                  {c.sub}
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  )
}

const css = `
  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    width: 100%;
    height: 100%;
    margin: 0;
  }

  body {
    overflow: hidden;
    background: #efefef;
  }

  .welcome-page {
    width: 100%;
    height: 100dvh;
    padding: 16px;
    background: #efefef;
    overflow: hidden;
    font-family: "Helvetica Neue", Arial, sans-serif;
  }

  .welcome-frame {
    width: 100%;
    height: calc(100dvh - 32px);
    max-width: 1180px;
    margin: 0 auto;
    background: #f8f8f8;
    border-radius: 28px;
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    display: flex;
    border: 1px solid #ececec;
  }

  .welcome-sidebar {
    width: 72px;
    background: #ffffff;
    border-right: 1px solid #f0f0f0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
    flex-shrink: 0;
  }

  .welcome-sidebarTop,
  .welcome-sidebarBottom {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .welcome-menuButton {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    border: none;
    background: transparent;
    color: #6b7280;
    font-size: 18px;
    cursor: pointer;
  }

  .welcome-sidebarNav {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }

  .welcome-sideNavItem {
    width: 34px;
    height: 34px;
    border-radius: 12px;
    border: none;
    background: transparent;
    color: #c0c4cc;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.18s ease;
  }

  .welcome-sideNavItem.is-active {
    color: #007c6e;
    background: #edf8f6;
    box-shadow: 0 8px 18px rgba(0, 124, 110, 0.1);
  }

  .welcome-smallAvatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #007c6e;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
  }

  .welcome-main {
    flex: 1;
    min-width: 0;
    min-height: 0;
    padding: 22px;
    background: #f7f7f7;
    display: flex;
    flex-direction: column;
    gap: 14px;
    overflow: hidden;
  }

  .welcome-topHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-shrink: 0;
  }

  .welcome-breadcrumb {
    display: flex;
    align-items: center;
    gap: 18px;
    flex-wrap: wrap;
  }

  .welcome-breadcrumbActive {
    font-size: 13px;
    color: #007c6e;
    font-weight: 700;
  }

  .welcome-breadcrumbMuted {
    font-size: 13px;
    color: #6b7280;
  }

  .welcome-headerRight {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
  }

  .welcome-timeText {
    font-size: 12px;
    color: #b7bcc6;
    font-weight: 600;
    white-space: nowrap;
  }

  .welcome-signOutBtn {
    background: transparent;
    border: 1.5px solid #007c6e;
    color: #007c6e;
    border-radius: 999px;
    padding: 9px 15px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.18s ease;
    flex-shrink: 0;
  }

  .welcome-signOutBtn.is-hovered {
    background: #007c6e;
    color: #ffffff;
    transform: translateY(-1px);
    box-shadow: 0 10px 18px rgba(0, 124, 110, 0.14);
  }

  .welcome-topGrid {
    display: grid;
    grid-template-columns: 1.35fr 0.72fr;
    gap: 14px;
    min-height: 0;
    flex: 0 0 auto;
  }

  .welcome-cardPanel,
  .welcome-balancePanel,
  .welcome-summaryPanel,
  .welcome-transactionsPanel {
    background: #ffffff;
    border-radius: 24px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
    border: 1px solid #f0f0f0;
    min-width: 0;
    min-height: 0;
  }

  .welcome-cardPanel,
  .welcome-balancePanel {
    height: 100%;
  }

  .welcome-sectionTop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 16px;
    flex-shrink: 0;
  }

  .welcome-sectionTitle {
    font-size: 15px;
    font-weight: 700;
    color: #23262d;
    margin: 0;
  }

  .welcome-dotBtn {
    border: none;
    background: transparent;
    color: #a6acb7;
    font-size: 18px;
    letter-spacing: 2px;
    cursor: pointer;
  }

  .welcome-balanceFilter,
  .welcome-linkBtn {
    border: none;
    background: transparent;
    color: #007c6e;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
  }

  .welcome-cardsRow {
    display: flex;
    align-items: center;
    gap: 14px;
    min-width: 0;
  }

  .welcome-addCard {
    width: 54px;
    height: 54px;
    border-radius: 14px;
    border: 1px dashed #d8dde5;
    background: #fbfbfb;
    color: #111827;
    font-size: 30px;
    line-height: 1;
    cursor: pointer;
    flex-shrink: 0;
  }

  .welcome-bankCardPrimary,
  .welcome-bankCardSecondary {
    width: 260px;
    height: 140px;
    border-radius: 18px;
    padding: 18px 18px 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-shrink: 0;
  }

  .welcome-bankCardPrimary {
    background: linear-gradient(135deg, #007c6e 0%, #005f54 100%);
    color: #ffffff;
    box-shadow: 0 18px 30px rgba(0, 124, 110, 0.18);
  }

  .welcome-bankCardSecondary {
    background: linear-gradient(135deg, #f7f7f7 0%, #e7e7e7 100%);
    color: #333;
    border: 1px solid #ededed;
  }

  .welcome-cardBrand,
  .welcome-cardBrandDark {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  .welcome-cardBrand {
    opacity: 0.95;
  }

  .welcome-cardBrandDark {
    color: #23262d;
  }

  .welcome-cardAmount,
  .welcome-cardAmountDark {
    font-size: 26px;
    font-weight: 800;
    letter-spacing: -0.04em;
    margin-top: 18px;
  }

  .welcome-cardNumber,
  .welcome-cardNumberLight {
    font-size: 12px;
    letter-spacing: 0.08em;
  }

  .welcome-cardNumber {
    opacity: 0.7;
  }

  .welcome-cardNumberLight {
    color: #8d9099;
  }

  .welcome-balanceAmount {
    font-size: 28px;
    font-weight: 800;
    color: #007c6e;
    letter-spacing: -0.04em;
    margin-top: 10px;
  }

  .welcome-balanceCardNumber {
    font-size: 12px;
    color: #8f95a3;
    margin-top: 6px;
    letter-spacing: 0.08em;
  }

  .welcome-incomeExpenseRow {
    display: flex;
    gap: 20px;
    margin-top: 24px;
  }

  .welcome-metricItem {
    min-width: 0;
  }

  .welcome-metricLabel {
    font-size: 11px;
    color: #b0b5bf;
    margin-bottom: 4px;
    font-weight: 600;
  }

  .welcome-metricValuePositive,
  .welcome-metricValueNegative {
    font-size: 13px;
    color: #111827;
    font-weight: 700;
  }

  .welcome-bottomGrid {
    display: grid;
    grid-template-columns: 1.3fr 0.7fr;
    gap: 14px;
    min-height: 0;
    flex: 1 1 auto;
    overflow: hidden;
  }

  .welcome-summaryPanel,
  .welcome-transactionsPanel {
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
  }

  .welcome-summaryContent {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 18px;
    align-items: center;
    min-height: 0;
    flex: 1;
  }

  .welcome-summaryTotals {
    border: 1px dashed #dfe4ea;
    border-radius: 16px;
    padding: 14px;
    background: #fbfbfb;
  }

  .welcome-totalBox {
    padding: 8px 4px;
  }

  .welcome-totalLabel {
    font-size: 11px;
    color: #a3aab6;
    margin-bottom: 4px;
  }

  .welcome-totalIncome {
    font-size: 18px;
    color: #007c6e;
    font-weight: 800;
  }

  .welcome-totalExpense {
    font-size: 18px;
    color: #ef4444;
    font-weight: 800;
  }

  .welcome-totalDivider {
    height: 1px;
    background: #e8ecf2;
    margin: 8px 0;
  }

  .welcome-chartWrap {
    min-width: 0;
  }

  .welcome-chartBars {
    display: flex;
    align-items: flex-end;
    gap: 12px;
    height: 140px;
    padding: 10px 0 0;
  }

  .welcome-barGroup {
    width: 100%;
    max-width: 22px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    flex: 1;
  }

  .welcome-bar {
    width: 6px;
    border-radius: 999px;
    background: #007c6e;
    box-shadow: 0 6px 14px rgba(0, 124, 110, 0.14);
  }

  .welcome-barLabel {
    font-size: 11px;
    color: #b5bbc6;
  }

  .welcome-chartFooter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    font-size: 12px;
    color: #8c93a2;
  }

  .welcome-chartDots {
    letter-spacing: 2px;
  }

  .welcome-txList {
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: hidden;
    flex: 1;
  }

  .welcome-txRow {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 14px;
    transition: all 0.18s ease;
  }

  .welcome-txRow.is-hovered {
    background: #f8faf9;
    transform: translateX(3px);
  }

  .welcome-txIcon {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
  }

  .welcome-txIcon.positive {
    color: #007c6e;
    background: #e6f4f2;
  }

  .welcome-txIcon.negative {
    color: #ef4444;
    background: #fef2f2;
  }

  .welcome-txText {
    flex: 1;
    min-width: 0;
  }

  .welcome-txLabel {
    font-size: 13px;
    color: #23262d;
    font-weight: 700;
    margin-bottom: 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .welcome-txCategory {
    font-size: 11px;
    color: #9ca3af;
  }

  .welcome-txAmountWrap {
    text-align: right;
    flex-shrink: 0;
  }

  .welcome-txAmountPositive {
    font-size: 13px;
    color: #007c6e;
    font-weight: 800;
    margin-bottom: 2px;
  }

  .welcome-txAmountNegative {
    font-size: 13px;
    color: #ef4444;
    font-weight: 800;
    margin-bottom: 2px;
  }

  .welcome-txDate {
    font-size: 11px;
    color: #b0b6c0;
  }

  .welcome-txActions {
    display: flex;
    gap: 10px;
    margin-top: 14px;
    flex-shrink: 0;
  }

  .welcome-actionBtn {
    flex: 1;
    border: none;
    background: #ffffff;
    color: #4b5563;
    border-radius: 12px;
    padding: 11px 14px;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.18s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
    border: 1px solid #e4e8ee;
  }

  .welcome-actionBtn.is-hovered {
    background: #f8faf9;
    border-color: #d7ddd8;
    transform: translateY(-1px);
  }

  .welcome-actionIcon {
    font-size: 14px;
    line-height: 1;
    color: #007c6e;
  }

  .welcome-actionLabel {
    white-space: nowrap;
  }

  .welcome-quickStats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    flex-shrink: 0;
  }

  .welcome-statCard {
    background: #ffffff;
    border-radius: 18px;
    padding: 16px;
    border: 1px solid #f0f0f0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
    transition: all 0.18s ease;
  }

  .welcome-statCard.is-hovered {
    transform: translateY(-2px);
    box-shadow: 0 14px 22px rgba(0, 0, 0, 0.06);
  }

  .welcome-statLabel {
    font-size: 11px;
    color: #9ca3af;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 700;
    margin-bottom: 10px;
  }

  .welcome-statValue {
    font-size: 18px;
    color: #23262d;
    font-weight: 800;
    letter-spacing: -0.03em;
    margin-bottom: 6px;
  }

  .welcome-statSub {
    font-size: 12px;
    font-weight: 700;
  }

  @media (max-width: 1100px) {
    .welcome-topGrid,
    .welcome-bottomGrid,
    .welcome-summaryContent {
      grid-template-columns: 1fr;
    }

    .welcome-main {
      overflow-y: auto;
      overflow-x: hidden;
    }

    .welcome-frame {
      height: auto;
      min-height: calc(100dvh - 32px);
    }

    .welcome-cardPanel,
    .welcome-balancePanel,
    .welcome-summaryPanel,
    .welcome-transactionsPanel {
      height: auto;
    }
  }

  @media (max-width: 760px) {
    .welcome-page {
      padding: 0;
      height: 100dvh;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .welcome-frame {
      min-height: 100dvh;
      height: auto;
      border-radius: 0;
      flex-direction: column;
    }

    .welcome-sidebar {
      width: 100%;
      height: 64px;
      flex-direction: row;
      padding: 0 14px;
      border-right: none;
      border-bottom: 1px solid #f0f0f0;
    }

    .welcome-sidebarNav {
      flex-direction: row;
      gap: 8px;
    }

    .welcome-main {
      padding: 14px;
      overflow: visible;
    }

    .welcome-topHeader {
      align-items: flex-start;
      flex-direction: column;
    }

    .welcome-headerRight {
      width: 100%;
      justify-content: space-between;
    }

    .welcome-cardsRow {
      flex-direction: column;
      align-items: stretch;
    }

    .welcome-addCard,
    .welcome-bankCardPrimary,
    .welcome-bankCardSecondary {
      width: 100%;
    }

    .welcome-quickStats {
      grid-template-columns: 1fr;
    }

    .welcome-txActions {
      flex-direction: column;
    }

    .welcome-incomeExpenseRow {
      flex-direction: column;
      gap: 10px;
    }

    .welcome-chartBars {
      gap: 8px;
      height: 120px;
    }
  }
`