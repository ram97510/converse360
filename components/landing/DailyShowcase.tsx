'use client';

import { BRAND, INK, WHITE } from '@/lib/tokens';

/**
 * One panel of the "More of what you'll use every day" showcase.
 *
 * The six panels used to live inline in LandingBody, each behind a `daily === n`
 * guard. They are indexed here instead so both layouts can reach them: the
 * desktop rail renders the single active panel, and the phone layout renders
 * every panel under its own heading.
 */
export default function DailyShowcase({ index }: { index: number }) {
  switch (index) {
    case 0:
      return (<>
              <div className="daily-showcase">
                <div className="showcase-bg-gradient showcase-bg--green"></div>
                <div className="showcase-content">
                  {/* Broadcast Manager Card */}
                  <div className="sc-card">
                    <div className="flex-between">
                      <span className="sc-badge-live">
                        <span className="sc-dot-pulse"></span> WhatsApp Broadcast Blast{' '}
                      </span>
                      <span className="sc-time-ago">Just now</span>
                    </div>
                    <h4 className="sc-title">Festive Season Flash Offer ⚡</h4>
                    <p className="sc-sub">Targeting: <strong>4,820 VIP Contacts</strong></p>
                    <div className="sc-progress-bar">
                      <div className="sc-progress-fill" style={{ width: "98.4%" }}></div>
                    </div>
                    <div className="sc-stats-row">
                      <div className="sc-stat">
                        <span className="sc-stat-val">4,820</span>
                        <span className="sc-stat-lbl">Sent</span>
                      </div>
                      <div className="sc-stat">
                        <span className="sc-stat-val">4,743</span>
                        <span className="sc-stat-lbl">Delivered (98.4%)</span>
                      </div>
                      <div className="sc-stat">
                        <span className="sc-stat-val">3,890</span>
                        <span className="sc-stat-lbl">Read (80.7%)</span>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp Phone Message Preview */}
                  <div className="sc-card-phone-preview">
                    <div className="wa-msg-header">
                      <div className="wa-avatar">C3</div>
                      <div>
                        <span className="wa-name">Converse360 <svg width="13" height="13" viewBox="0 0 24 24" fill={BRAND}>
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg></span>
                        <span className="wa-sub">Official Account</span>
                      </div>
                    </div>
                    <div className="wa-bubble">
                      <div className="wa-banner-img">
                        <img src="/assets/feat-broadcasts.png" alt="Broadcast preview" />
                      </div>
                      <div className="wa-bubble-title">Exclusive Member Discount! 🎁</div>
                      <div className="wa-bubble-text">Hey Ankit! Get 25% off on all automation plans today. Valid for next
                        24h.</div>
                      <button className="wa-btn-cta">Claim Offer Now</button>
                    </div>
                  </div>

                  {/* Floating Badge pill */}
                  <div className="sc-floating-pill">
                    <span className="sc-pill-icon">✓</span>
                    <span>Broadcast Delivered to 4,743 Contacts</span>
                  </div>
                </div>
              </div>
      </>);
    case 1:
      return (<>
              <div className="daily-showcase">
                <div className="showcase-bg-gradient showcase-bg--blue"></div>
                <div className="showcase-content">
                  {/* Smart Segment Card */}
                  <div className="sc-card">
                    <div className="flex-between">
                      <div>
                        <span className="sc-tag-pill">Smart Segment</span>
                        <h3 className="sc-card-h3">High-Intent Meta Ad Leads</h3>
                      </div>
                      <span className="sc-count-badge">1,420 Contacts</span>
                    </div>

                    <div className="sc-rules-box">
                      <span className="sc-rule-chip">Filter: Source = Click to WhatsApp</span>
                      <span className="sc-rule-chip">Filter: Engaged &lt; 24h</span>
                      <span className="sc-rule-chip">Tag: Qualified Lead</span>
                    </div>

                    <div className="sc-contacts-list">
                      <div className="sc-contact-row">
                        <div className="sc-avatar av-1">AK</div>
                        <div className="sc-c-info">
                          <span className="sc-c-name">Ankit Kumar</span>
                          <span className="sc-c-detail">+91 98765 43210 • Clicked Meta Ad #4</span>
                        </div>
                        <span className="sc-status-pill sc-status--green">Engaged</span>
                      </div>
                      <div className="sc-contact-row">
                        <div className="sc-avatar av-2">MR</div>
                        <div className="sc-c-info">
                          <span className="sc-c-name">Michael Royce</span>
                          <span className="sc-c-detail">+1 97856 43210 • Web Visitor</span>
                        </div>
                        <span className="sc-status-pill sc-status--purple">Form Submitted</span>
                      </div>
                      <div className="sc-contact-row">
                        <div className="sc-avatar av-3">SL</div>
                        <div className="sc-c-info">
                          <span className="sc-c-name">Sophia Liu</span>
                          <span className="sc-c-detail">+44 7700 900077 • QR Code Scan</span>
                        </div>
                        <span className="sc-status-pill sc-status--blue">Deal Created</span>
                      </div>
                    </div>
                  </div>

                  {/* Floating Badge */}
                  <div className="sc-floating-pill">
                    <span className="sc-pill-icon">⚡</span>
                    <span>Auto-syncing active contacts 24/7</span>
                  </div>
                </div>
              </div>
      </>);
    case 2:
      return (<>
              <div className="daily-showcase">
                <div className="showcase-bg-gradient showcase-bg--emerald"></div>
                <div className="showcase-content attribution-layout">

                  <div className="attr-sources-grid">
                    {/* Source 1: Meta Ads Card */}
                    <div className="attr-card">
                      <div className="attr-card-lbl">Meta Ads</div>
                      <div className="attr-card-box">
                        <div className="attr-meta-header">
                          <div className="attr-meta-icon">
                            <img src="/assets/meta-mark.png" width="16" height="16" alt="Meta" />
                          </div>
                          <div>
                            <div className="attr-meta-title">Arc Travel</div>
                            <div className="attr-meta-sub">Sponsored</div>
                          </div>
                        </div>
                        <div className="attr-meta-img">
                          <img src="/assets/our-approach.jpg" alt="Meta Ad Banner" />
                        </div>
                        <div className="attr-wa-btn">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill={WHITE}>
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.347.52-.52.174-.174.232-.298.347-.497.115-.198.057-.371-.03-.52-.086-.148-.66-1.59-.905-2.174-.234-.556-.47-.48-.646-.487-.174-.007-.373-.008-.572-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                          </svg> WhatsApp{' '}
                        </div>
                      </div>
                    </div>

                    {/* Source 2: QR Code Card */}
                    <div className="attr-card">
                      <div className="attr-card-lbl">QR Code</div>
                      <div className="attr-card-box attr-qr-box">
                        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.8">
                          <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
                          <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
                          <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
                          <rect x="14" y="14" width="3" height="3"></rect>
                          <rect x="18" y="18" width="3" height="3"></rect>
                        </svg>
                        <span className="attr-qr-sub">Scan &amp; Chat</span>
                      </div>
                    </div>

                    {/* Source 3: Links Card */}
                    <div className="attr-card">
                      <div className="attr-card-lbl">Links</div>
                      <div className="attr-card-box attr-link-box">
                        <div className="attr-link-pill">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.2">
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                          </svg>
                          <span>c360.bx05</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Connecting Line Graphic (Image 2) */}
                  <div className="attr-connector-wrap">
                    <svg className="attr-lines-svg" viewBox="0 0 400 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M60 0V22C60 28 65 32 72 32H192C198 32 200 34 200 40V44" stroke="#86EFAC" strokeWidth="3" strokeLinecap="round" />
                      <path d="M200 0V44" stroke="#86EFAC" strokeWidth="3" strokeLinecap="round" />
                      <path d="M340 0V22C340 28 335 32 328 32H208C202 32 200 34 200 40V44" stroke="#86EFAC" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Bottom Lead Avatars Pill (Exact match to Image 2!) */}
                  <div className="attr-leads-pill">
                    <div className="attr-avatar-stack">
                      <div className="attr-av av-pic-1"></div>
                      <div className="attr-av av-pic-2"></div>
                      <div className="attr-av av-pic-3"></div>
                      <div className="attr-av av-pic-4"></div>
                      <div className="attr-av av-pic-5"></div>
                    </div>
                    <span className="attr-leads-label">Leads Captured Real-Time</span>
                  </div>

                </div>
              </div>
      </>);
    case 3:
      return (<>
              <div className="daily-showcase">
                <div className="showcase-bg-gradient showcase-bg--purple"></div>
                <div className="showcase-content">
                  {/* CRM Pipeline Board */}
                  <div className="sc-card sc-card-pipeline">
                    <div className="pipe-header flex-between">
                      <div>
                        <span className="pipe-tag">Visual CRM Pipeline</span>
                        <h3 className="sc-card-h3">Converse360 Deals Tracker</h3>
                      </div>
                      <span className="sc-count-badge">$134,900 Total Value</span>
                    </div>

                    <div className="pipe-cols-grid">
                      <div className="pipe-col">
                        <div className="pipe-col-head">
                          <span>New Enquiries</span>
                          <span className="pipe-col-count">3</span>
                        </div>
                        <div className="pipe-deal-card">
                          <div className="deal-title">Starlight Boutique</div>
                          <div className="deal-meta flex-between">
                            <span className="deal-source">WhatsApp</span>
                            <span className="deal-value">$4,200</span>
                          </div>
                        </div>
                      </div>
                      <div className="pipe-col">
                        <div className="pipe-col-head">
                          <span>Qualified</span>
                          <span className="pipe-col-count">2</span>
                        </div>
                        <div className="pipe-deal-card pipe-deal-highlight">
                          <div className="deal-title">Arc Travel Enterprise</div>
                          <div className="deal-meta flex-between">
                            <span className="deal-source">Click to WA</span>
                            <span className="deal-value">$18,000</span>
                          </div>
                          <div className="deal-owner">
                            <span className="owner-av">AK</span> Assigned to Ankit{' '}
                          </div>
                        </div>
                      </div>
                      <div className="pipe-col">
                        <div className="pipe-col-head">
                          <span>Won Deals 🎉</span>
                          <span className="pipe-col-count">14</span>
                        </div>
                        <div className="pipe-deal-card pipe-deal-won">
                          <div className="deal-title">Apex Logistics Ltd</div>
                          <div className="deal-meta flex-between">
                            <span className="deal-badge-won">✓ Won</span>
                            <span className="deal-value">$32,500</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Badge */}
                  <div className="sc-floating-pill">
                    <span className="sc-pill-icon">📊</span>
                    <span>Track deals directly from WhatsApp chat</span>
                  </div>
                </div>
              </div>
      </>);
    case 4:
      return (<>
              <div className="daily-showcase">
                <div className="showcase-bg-gradient showcase-bg--green-dark"></div>
                <div className="showcase-content">

                  <div className="sc-card sc-card-wa-setup">
                    <div className="wa-profile-header">
                      <div className="wa-profile-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill={WHITE}>
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.347.52-.52.174-.174.232-.298.347-.497.115-.198.057-.371-.03-.52-.086-.148-.66-1.59-.905-2.174-.234-.556-.47-.48-.646-.487-.174-.007-.373-.008-.572-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                        </svg>
                      </div>
                      <div>
                        <div className="wa-prof-title">Converse360 <span className="wa-green-check">✓</span></div>
                        <div className="wa-prof-sub">Verified Meta Tech Partner</div>
                      </div>
                    </div>

                    <div className="wa-cat-preview">
                      <div className="wa-cat-header flex-between">
                        <span>WhatsApp Business Catalog</span>
                        <span className="wa-cat-link">View Catalog &gt;</span>
                      </div>
                      <div className="wa-cat-grid">
                        <div className="wa-cat-item">
                          <div className="wa-item-thumb">📦</div>
                          <div className="wa-item-name">AI Sales Bot</div>
                          <div className="wa-item-price">$99.00</div>
                        </div>
                        <div className="wa-cat-item">
                          <div className="wa-item-thumb">💬</div>
                          <div className="wa-item-name">Multi-Inbox</div>
                          <div className="wa-item-price">$149.00</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Badge */}
                  <div className="sc-floating-pill">
                    <span className="sc-pill-icon">✓</span>
                    <span>Official WhatsApp API Partner • Guaranteed Setup</span>
                  </div>

                </div>
              </div>
      </>);
    case 5:
      return (<>
              <div className="daily-showcase">
                <div className="showcase-bg-gradient showcase-bg--light-blue"></div>
                <div className="showcase-content widget-layout">

                  {/* Chat conversation bubble */}
                  <div className="widget-chat-box">
                    <div className="widget-msg widget-msg--bot">
                      {' '}If you don’t mind, Can you please share your details, we can share details on WhatsApp?{' '}
                    </div>
                    <div className="widget-msg widget-msg--user">
                      {' '}Yeah, sure{' '}
                    </div>
                  </div>

                  {/* Web Form Lead Capture Card (Exact match to Image 3!) */}
                  <div className="widget-form-card">
                    <div className="w-form-group">
                      <div className="w-input-mock">Michael Royce</div>
                    </div>
                    <div className="w-form-group">
                      <div className="w-input-mock">+1- 97856 43210</div>
                    </div>
                    <button className="w-btn-submit">
                      {' '}Continue on WhatsApp{' '}
                      <svg width="15" height="15" viewBox="0 0 24 24" fill={WHITE}>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.347-.347.52-.52.174-.174.232-.298.347-.497.115-.198.057-.371-.03-.52-.086-.148-.66-1.59-.905-2.174-.234-.556-.47-.48-.646-.487-.174-.007-.373-.008-.572-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                      </svg>
                    </button>
                  </div>

                </div>
              </div>
      </>);
    default:
      return null;
  }
}
