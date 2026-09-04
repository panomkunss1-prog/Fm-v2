/**
 * Thai dictionary — the default language (docs/ARCHITECTURE.md section 4).
 * Reference data, same category as club/seed lists. Must define exactly the
 * same key set as `./en.ts`; `TranslationDictionary` makes a missing/extra
 * key a `tsc` error, and `tests/unit/data/translations.test.ts` diffs the
 * two key sets again at test time.
 */
import type { TranslationDictionary } from '@core/i18n';

export const th: TranslationDictionary = {
  'nav.dashboard': 'แดชบอร์ด',
  'nav.club': 'สโมสร',
  'nav.finance': 'การเงิน',
  'nav.league': 'ลีก',
  'nav.association': 'สมาคม',
  'nav.primaryLabel': 'เมนูหลัก',

  'role.chairman': 'ประธานสโมสร',
  'role.faPresident': 'นายกสมาคม',
  'role.groupLabel': 'บทบาทผู้เล่น',

  'language.th': 'ไทย',
  'language.en': 'English',
  'language.toggleLabel': 'ภาษา',

  'header.faPresidentTitle': 'นายกสมาคมฟุตบอล',

  'dashboard.seasonContext': 'ฤดูกาล {season} · นัดที่ {matchday} จาก {total}',
  'dashboard.boardConfidence': 'ความเชื่อมั่นบอร์ดบริหาร',
  'dashboard.clubFinance': 'การเงินสโมสร',
  'dashboard.nextFixture': 'นัดต่อไป',
  'dashboard.noFixtureScheduled': 'ยังไม่มีนัดที่กำหนดไว้',
  'dashboard.season': 'ฤดูกาล',
  'dashboard.seasonProgressLabel': 'ความคืบหน้าของฤดูกาล',
  'dashboard.seasonProgressCaption': 'ฤดูกาลผ่านไปแล้ว {percent}%',
  'dashboard.matchdayPill': 'นัดที่ {matchday}',
  'dashboard.home': 'เหย้า',
  'dashboard.away': 'เยือน',
  'dashboard.vs': 'พบ',

  'board.level.critical': 'วิกฤต',
  'board.level.underPressure': 'ถูกกดดัน',
  'board.level.stable': 'มั่นคง',
  'board.level.strong': 'แข็งแกร่ง',

  'finance.health.critical': 'วิกฤต',
  'finance.health.caution': 'ต้องระวัง',
  'finance.health.healthy': 'แข็งแรง',

  'emptyState.notBuiltYet': 'ยังไม่เปิดใช้งาน',
  'common.tbd': 'รอประกาศ',

  'club.title': 'การจัดการสโมสร',
  'club.description': 'ระบบดูแลผู้จัดการทีม การซื้อขายนักเตะ สปอนเซอร์ และการลงทุนสนาม/สิ่งอำนวยความสะดวก จะมาในชิ้นงานถัดไป',
  'club.emptyState.meta': 'อยู่ในแผนเวฟที่ 2–3',

  'finance.description': 'ระบบบัญชีรายรับรายจ่ายเต็มรูปแบบ งบประมาณ และรายได้จากสปอนเซอร์ จะมาในชิ้นงานถัดไป',
  'finance.emptyState.meta': 'อยู่ในแผนเวฟที่ 2 — ชิ้นที่ 5',

  'league.eyebrow': 'การแข่งขัน',
  'league.description': 'ตารางการแข่งขันและตารางคะแนนลีกแบบเต็มรูปแบบ จะมาในชิ้นงานถัดไป',
  'league.emptyState.meta': 'อยู่ในแผนเวฟที่ 2 — ชิ้นที่ 3',

  'association.eyebrow': 'การกำกับดูแล',
  'association.title': 'สมาคมฟุตบอล',
  'association.description': 'การกำกับดูแลการแข่งขันระดับชาติ การพัฒนาผู้ตัดสิน และสายพัฒนาเยาวชน จะมาในชิ้นงานถัดไป',
  'association.emptyState.meta': 'อยู่ในแผนเวฟที่ 4 — ชิ้นที่ 12',

  'fa.officeOfPresident': 'สำนักงานนายกสมาคม',
  'fa.seasonNote': 'การกำกับดูแลการแข่งขันระดับชาติใช้ปฏิทินฤดูกาลเดียวกับลีก',
  'fa.governanceFocusAreas': 'ประเด็นการกำกับดูแลหลัก',
  'fa.focus.nationalCompetitions': 'การแข่งขันระดับชาติ',
  'fa.focus.nationalTeamPipeline': 'สายพัฒนาทีมชาติ',
  'fa.focus.refereeDevelopment': 'การพัฒนาผู้ตัดสิน',
  'fa.focus.footballInfrastructure': 'โครงสร้างพื้นฐานฟุตบอล',
  'fa.planned': 'อยู่ในแผน',
  'fa.emptyState.eyebrow': 'นายกสมาคมฟุตบอล',
  'fa.emptyState.title': 'ศูนย์บัญชาการนายกสมาคม',
  'fa.emptyState.description':
    'เครื่องมือกำกับดูแลระดับชาติแบบเต็มรูปแบบ — การแข่งขัน ผู้ตัดสิน สายพัฒนาเยาวชน และโครงสร้างพื้นฐาน — จะมาในชิ้นงานถัดไป',
  'fa.emptyState.meta': 'อยู่ในแผนเวฟที่ 4',
};
