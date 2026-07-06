import { CustemStyles } from "@/components/Theme/custemAll";
import { AntDesign, Fontisto, Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {

  ZoomIn,
} from "react-native-reanimated";
const { width: W } = Dimensions.get("window");

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const PRIMARY = "#21005f";
const ORANGE = "#FF5722";
const TEXT = "#1A1A2E";
const MUTED = "#6B7280";
const BG = "#F4F6F8";
const WHITE = "#FFFFFF";
const BORDER = "#E5E7EB";

// ─── DATA ────────────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "1",
    icon: require("../../assets/images/women-saloon.jpg"),
    label: "Women's\nSalon",
    bg: "#FFF0F5",
  },
  {
    id: "2",
    icon: require("../../assets/images/massage.jpg"),
    label: "Massage\nfor Men",
    bg: "#F0F5FF",
  },
  {
    id: "3",
    icon: require("../../assets/images/cleaning.avif"),
    label: "Cleaning",
    bg: "#F0FFF5",
  },
  {
    id: "4",
    icon: require("../../assets/images/ac-repair.jpg"),
    label: "AC & Appliance",
    bg: "#F0FAFF",
  },
  {
    id: "5",
    icon: require("../../assets/images/electrician-img.jpg"),
    label: "Electrician",
    bg: "#FFFBF0",
  },
  {
    id: "6",
    icon: require("../../assets/images/plumber.jpg"),
    label: "Plumber",
    bg: "#F5F0FF",
  },
];

const BANNERS = [
  {
    id: "1",
    title: "Get your AC\nready for summer",
    sub: "Up to 25% off on AC servicing",
    color: PRIMARY,
    img: require("../../assets/images/ac-service.webp"),
  },
  {
    id: "2",
    title: "Sofa Deep Cleaning\nat ₹569",
    sub: "Professional home cleaning",
    color: "#2E7D5E",
    img: require("../../assets/images/sofa-clean.jpg"),
  },
  {
    id: "3",
    title: "Salon for Women\nat home",
    sub: "Pamper yourself anytime",
    color: "#AD1457",
    img: require("../../assets/images/salon-women.avif"),
  },
];

const MOST_BOOKED = [
  {
    id: "1",
    name: "Foam-jet AC Service",
    rating: "4.76",
    tag: "Instant",
    price: "₹599",
    img: require("../../assets/images/mostBooked-img2.webp"),
  },
  {
    id: "2",
    name: "Haircut for Men",
    rating: "4.74",
    tag: "Instant",
    price: "₹99",
    img: require("../../assets/images/mostBooked-img4.jpg"),
  },
  {
    id: "3",
    name: "Insta Help",
    rating: "4.74",
    tag: "Instant",
    price: "₹320",
    img: require("../../assets/images/mostBooked-img5.avif"),
  },
  {
    id: "4",
    name: "Fan Repair",
    rating: "4.74",
    tag: "Instant",
    price: "₹299",
    img: require("../../assets/images/mostBooked-img6.jpg"),
  },
  {
    id: "5",
    name: "Plumber Consultation",
    rating: "4.74",
    tag: "Instant",
    price: "₹299",
    img: require("../../assets/images/mostBooked-img7.jpg"),
  },
  {
    id: "6",
    name: "Bathroom Deep Clean",
    rating: "4.80",
    tag: "Instant",
    price: "₹960",
    img: require("../../assets/images/mostBooked-img3.jpg"),
  },
];

const SALON = [
  {
    id: "2",
    name: "Facial cleansing",
    price: "₹149",
    img: require("../../assets/images/gitlSaloon-1.jpg"),
  },
  {
    id: "3",
    name: "Hair cut",
    price: "₹449",
    img: require("../../assets/images/gitlSaloon-2.webp"),
  },

  {
    id: "4",
    name: "Firming Facial",
    price: "₹799",
    img: require("../../assets/images/gitlSaloon-3.jpg"),
  },
  {
    id: "1",
    name: "Spatula Waxing",
    price: "₹449",
    img: require("../../assets/images/gitlSaloon-4.jpg"),
  },
];

const NOTEWORTHY = [
  {
    id: "1",
    name: "Water Purifier",
    img: require("../../assets/images/new-img1.jpg"),
  },
  {
    id: "2",
    name: "Kitchen Cleaning",
    img: require("../../assets/images/new-img2.jpg"),
  },
  {
    id: "3",
    name: "Hair Studio",
    img: require("../../assets/images/new-img3.avif"),
  },
  {
    id: "4",
    name: "AC Service",
    img: require("../../assets/images/new-img4.png"),
  },
];

const HOME_REPAIR = [
  {
    id: "1",
    name: "Drill (per hole)",
    rating: "4.81",
    reviews: "210K",
    price: "₹49",
    hasOptions: true,
    optionCount: 3,
    img: require("../../assets/images/drill-1.jpg"),
  },
  {
    id: "2",
    name: "Carpenters consultation",
    rating: "4.66",
    reviews: "130K",
    price: "₹49",
    hasOptions: false,
    img: require("../../assets/images/drill-2.jpg"),
  },
  {
    id: "3",
    name: "Fan installation",
    rating: "4.72",
    reviews: "95K",
    price: "₹149",
    hasOptions: false,
    img: require("../../assets/images/drill-3.jpg"),
  },
];

const PROMO_BANNERS = [
  {
    id: "p1",
    title: "Expert Plumbing Services",
    sub: "Quick fixes, affordable rates.",
    img: require("../../assets/images/mostBooked-img7.jpg"),
  },
];

// ─── SMALL HELPERS ────────────────────────────────────────────────────────────
const Divider = () => <View style={s.divider} />;

const SectionHeader = ({ title, subtitle, onSeeAll }) => (
  <View style={s.sectionHeader}>
    <View style={{ flex: 1 }}>
      <Text style={s.sectionTitle}>{title}</Text>
      {subtitle ? <Text style={s.sectionSubtitle}>{subtitle}</Text> : null}
    </View>
    {onSeeAll && (
      <TouchableOpacity onPress={onSeeAll}>
        <Text style={s.seeAll}>See all</Text>
      </TouchableOpacity>
    )}
  </View>
);

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const [activeBanner, setActiveBanner] = useState(0);
  const bannerRef = useRef(null);

  const handleBannerScroll = (e) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / (W - 32));
    setActiveBanner(idx);
  };

  return (
    <SafeAreaView style={s.safe} edges={["top"]}>
      <Animated.View entering={ZoomIn.duration(400)} style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor={WHITE} />

      {/* TOP BAR */}
      <View style={s.topBar}>
        <View style={s.locationRow}>
          <Ionicons
            name="location-sharp"
            size={25}
            color={PRIMARY}
            style={{ marginRight: 6 }}
          />
          <View style={{ flex: 1 }}>
            <Text style={s.deliveryIn}>In 48 minutes</Text>
            <Text style={s.locationText} numberOfLines={1}>
              Phase-VII · Rangeswar Nagar, Sailashree…{" "}
              <AntDesign name="caret-down" size={9} color={MUTED} />
            </Text>
          </View>

          <TouchableOpacity style={s.cartBtn}>
            <AntDesign name="shopping-cart" size={24} color={PRIMARY} />
          </TouchableOpacity>
        </View>
        <View style={s.searchBox}>
          <Fontisto name="search" size={14} color={MUTED} />
          <TextInput
            style={s.searchInput}
            placeholder='Search for "AC service"'
            placeholderTextColor={MUTED}
          />
        </View>
      </View>

      
        <ScrollView showsVerticalScrollIndicator={false} style={s.scroll}>
          {/* ① BANNER CAROUSEL */}
          <ScrollView
            ref={bannerRef}
            horizontal
            snapToInterval={W - 32}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={s.bannerList}
            onScroll={handleBannerScroll}
            scrollEventThrottle={16}
          >
            {BANNERS.map((b) => (
              <View
                key={b.id}
                style={[s.bannerCard, { backgroundColor: b.color }]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={s.bannerTitle}>{b.title}</Text>
                  <Text style={s.bannerSub}>{b.sub}</Text>
                  <TouchableOpacity style={s.bannerBtn}>
                    <Text style={s.bannerBtnTxt}>Book now</Text>
                  </TouchableOpacity>
                </View>
                <Image source={b.img} style={s.bannerThumb} />
              </View>
            ))}
          </ScrollView>

          {/* ② CATEGORIES */}
          <View style={s.section}>
            <View style={s.catGrid}>
              {CATEGORIES.map((c) => (
                <TouchableOpacity
                  key={c.id}
                  style={s.catItem}
                  activeOpacity={0.75}
                >
                  <View style={s.catIconBox}>
                    <Image source={c.icon} style={s.catImg} />
                  </View>
                  <Text style={s.catLabel}>{c.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Divider />

          {/* ③ NEW & NOTEWORTHY */}
          <View style={s.section}>
            <Text style={s.sectionTitle}>New and noteworthy</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {NOTEWORTHY.map((n) => (
                <TouchableOpacity
                  key={n.id}
                  style={s.noteCard}
                  activeOpacity={0.85}
                >
                  <Image source={n.img} style={s.noteImg} />
                  <Text style={s.noteLabel}>{n.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <Divider />

          {/* ④ MOST BOOKED */}
          <View style={s.section}>
            <Text style={s.sectionTitle}>Most booked services</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {MOST_BOOKED.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={s.bookedCard}
                  activeOpacity={0.85}
                >
                  <Image source={item.img} style={s.bookedImg} />
                  <View style={s.bookedInfo}>
                    <Text style={s.bookedName} numberOfLines={2}>
                      {item.name}
                    </Text>
                    <Text style={s.bookedTag}>⚡ {item.tag}</Text>
                    <Text style={s.bookedPrice}>{item.price}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <Divider />

          {/* ⑤ WATER PURIFIER HERO BANNER */}
          <View style={s.section}>
            <TouchableOpacity style={s.heroBanner} activeOpacity={0.9}>
              <Image
                source={require("../../assets/images/water-purifier-banner.webp")}
                style={s.heroBannerImg}
              />
              <View style={s.heroBannerContent}>
                <Text style={s.heroBannerBrand}>NATIVE</Text>
                <Text style={s.heroBannerTitle}>RO Water Purifier</Text>
                <Text style={s.paintSub}>2-years, ₹0 cost.</Text>
                <TouchableOpacity style={s.heroBannerBtn}>
                  <Text style={s.heroBannerBtnTxt}>Buy now</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>

          <Divider />

          {/* ⑥ SALON FOR WOMEN */}
          <View style={s.section}>
            <SectionHeader title="Salon for Women" onSeeAll={() => {}} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {SALON.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={s.salonCard}
                  activeOpacity={0.85}
                >
                  <Image source={item.img} style={s.salonImg} />
                  <Text style={s.salonName} numberOfLines={2}>
                    {item.name}
                  </Text>
                  <Text style={s.salonPrice}>{item.price}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <Divider />

          <View style={s.section}>
            <TouchableOpacity style={s.heroBanner} activeOpacity={0.9}>
              <Image
                source={require("../../assets/images/electrician-banner.jpg")}
                style={s.heroBannerImg}
              />
              <View style={s.heroBannerContent}>
                <Text style={s.heroBannerTitle}>
                  Professional Electrician Services
                </Text>
                <Text style={s.paintSub}>
                  Safe wiring, fast repairs, trusted experts
                </Text>
                <TouchableOpacity style={s.heroBannerBtn}>
                  <Text style={s.heroBannerBtnTxt}>Buy now</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>

          {/* ⑧ HOME REPAIR & INSTALLATION */}
          <View style={s.section}>
            <SectionHeader
              title={"Home repair &\ninstallation"}
              onSeeAll={() => {}}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 10, paddingRight: 4 }}
            >
              {HOME_REPAIR.map((item) => (
                <View key={item.id} style={s.repairCard}>
                  <View style={s.repairImgBox}>
                    <Image source={item.img} style={s.repairImg} />
                  </View>
                  <View style={s.repairNames}>
                    <Text style={s.repairName} numberOfLines={2}>
                      {item.name}
                    </Text>
                    <View style={s.ratingRow}>
                      <Text style={s.starIcon}>★</Text>
                      <Text style={s.ratingTxt}>{item.rating}</Text>
                      <Text style={s.reviewsTxt}> ({item.reviews})</Text>
                    </View>
                    <View style={s.repairFooter}>
                      <View>
                        <Text style={s.startsAt}>Starts at</Text>
                        <Text style={s.repairPrice}>{item.price}</Text>
                      </View>
                      <TouchableOpacity style={s.addBtn}>
                        <Text style={s.addTxt}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>

          <Divider />

          {/* ⑨ PROMO BANNERS (plumber + electrician) */}

          <View style={s.section}>
            <TouchableOpacity style={s.heroBanner} activeOpacity={0.9}>
              <Image
                source={require("../../assets/images/mostBooked-img7.jpg")}
                style={s.heroBannerImg}
              />
              <View style={s.heroBannerContent}>
                <Text style={s.heroBannerTitle}>Expert Plumbing Services</Text>
                <Text style={s.paintSub}>Quick fixes, affordable rates</Text>
                <TouchableOpacity style={s.heroBannerBtn}>
                  <Text style={s.heroBannerBtnTxt}>Book now</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>

          {/* ⑩ REFER CARD */}
          <View style={s.section}>
            <View style={s.referCard}>
              <View style={{ flex: 1 }}>
                <Text style={s.referTitle}>Refer & get free services</Text>
                <Text style={s.referSub}>Invite a friend and get ₹100</Text>
                <TouchableOpacity style={s.referBtn}>
                  <Text style={s.referBtnTxt}>Invite Now</Text>
                </TouchableOpacity>
              </View>
              <Text style={s.referEmoji}>
                <Image
                  source={require("../../assets/images/rewards.webp")}
                  style={s.rewards}
                />
              </Text>
            </View>
          </View>

          <View />
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

// ─── STYLES (zero duplicates) ─────────────────────────────────────────────────
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: WHITE },
  scroll: { flex: 1, backgroundColor: BG },
  divider: { height: 8, backgroundColor: BG },

  // TOP BAR
  topBar: {
    backgroundColor: WHITE,
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    elevation: 1,
    shadowColor: "#0000005b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    zIndex: 10,
  },
  locationRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  deliveryIn: { fontSize: 13, fontWeight: "700", color: TEXT },
  locationText: { fontSize: 11, color: MUTED },
  cartBtn: {
    marginLeft: "auto",
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: BG,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  rewards: {
    height: 100,
    width: 100,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: CustemStyles.INPUT.background,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: CustemStyles.INPUT_BORDER.bordersCol,
  },
  searchInput: { flex: 1, fontSize: 13, color: TEXT, padding: 0 },
  repairNames: {
    padding: 9,
  },
  // BANNER CAROUSEL
  bannerList: { paddingHorizontal: 12, paddingTop: 14, gap: 10 },
  bannerCard: {
    width: W - 32,
    borderRadius: 18,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 18,
    paddingVertical: 20,
    marginRight: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: WHITE,
    lineHeight: 22,
    marginBottom: 4,
  },
  bannerSub: { fontSize: 10, color: "rgba(255,255,255,0.8)", marginBottom: 12 },
  bannerBtn: {
    backgroundColor: WHITE,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 7,
    alignSelf: "flex-start",
  },
  bannerBtnTxt: { fontSize: 12, fontWeight: "700", color: TEXT },
  bannerThumb: { width: 105, height: 105, borderRadius: 10, marginRight: 12 },

  // SECTION COMMON
  section: {
    backgroundColor: WHITE,
    paddingHorizontal: 14,
    paddingVertical: 18,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: TEXT,
    letterSpacing: -0.2,
    lineHeight: 22,
    marginBottom: 12,
  },
  sectionSubtitle: { fontSize: 11, color: MUTED, marginTop: 2 },
  seeAll: { fontSize: 13, fontWeight: "700", color: PRIMARY, marginTop: 2 },

  // CATEGORIES
  catGrid: { flexDirection: "row", flexWrap: "wrap" },
  catItem: { width: (W - 32) / 3, alignItems: "center", paddingVertical: 8 },
  catIconBox: {
    width: 58,
    height: 58,
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 6,
    elevation: 1,
    shadowColor: "#0003",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
  },
  catImg: { width: "100%", height: "100%" },
  catLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: TEXT,
    textAlign: "center",
    lineHeight: 15,
  },

  // NOTEWORTHY
  noteCard: { width: 100, alignItems: "center", marginRight: 12 },
  noteImg: {
    width: 96,
    height: 96,
    borderRadius: 14,
    marginBottom: 7,
    backgroundColor: "#EEE",
  },
  noteLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: TEXT,
    textAlign: "center",
  },

  // MOST BOOKED
  bookedCard: {
    width: 155,
    borderRadius: 14,
    backgroundColor: WHITE,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: BORDER,
    marginRight: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  bookedImg: { width: "100%", height: 108, backgroundColor: "#E2E8F0" },
  bookedInfo: { padding: 9 },
  bookedName: {
    fontSize: 12,
    fontWeight: "700",
    color: TEXT,
    lineHeight: 17,
    marginBottom: 4,
  },
  bookedTag: {
    fontSize: 10,
    fontWeight: "700",
    color: CustemStyles.PRIMARY.background,
    marginBottom: 3,
  },
  bookedPrice: { fontSize: 13, fontWeight: "800", color: TEXT },

  // HERO BANNER (reused)
  heroBanner: {
    borderRadius: 16,
    overflow: "hidden",
    height: 175,
    backgroundColor: "#111",
  },
  heroBannerImg: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    opacity: 0.38,
  },
  heroBannerContent: { flex: 1, padding: 18, justifyContent: "center" },
  heroBannerBrand: {
    fontSize: 10,
    fontWeight: "900",
    color: "rgba(255,255,255,0.6)",
    letterSpacing: 3,
    marginBottom: 4,
  },
  heroBannerTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: WHITE,
    marginBottom: 4,
  },
  heroBannerBtn: {
    backgroundColor: WHITE,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 7,
    alignSelf: "flex-start",
  },
  heroBannerBtnTxt: { fontSize: 12, fontWeight: "700", color: TEXT },

  // SALON
  salonCard: { width: 105, marginRight: 10 },
  salonImg: {
    width: "100%",
    height: 130,
    borderRadius: 12,
    marginBottom: 6,
    backgroundColor: "#EEE",
  },
  salonName: {
    fontSize: 11,
    fontWeight: "600",
    color: TEXT,
    lineHeight: 16,
    marginBottom: 2,
  },
  salonPrice: { fontSize: 12, fontWeight: "700", color: ORANGE },

  paintSub: { fontSize: 12, color: "rgba(255,255,255,0.85)", marginBottom: 14 },

  // HOME REPAIR CARDS
  repairCard: {
    width: 148,
    backgroundColor: WHITE,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: BORDER,
    // padding: 9,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    overflow: "hidden",
  },
  repairImgBox: {
    width: "100%",
    height: 108,
    overflow: "hidden",
    backgroundColor: "#F3F4F6",
    marginBottom: 7,
  },
  repairImg: { width: "100%", height: "100%" },
  repairName: {
    fontSize: 12,
    fontWeight: "700",
    color: TEXT,
    lineHeight: 17,
    marginBottom: 4,
  },
  ratingRow: { flexDirection: "row", alignItems: "center", marginBottom: 7 },
  starIcon: { fontSize: 11, color: "#F59E0B" },
  ratingTxt: { fontSize: 11, fontWeight: "700", color: TEXT, marginLeft: 2 },
  reviewsTxt: { fontSize: 10, color: MUTED },
  repairFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  startsAt: { fontSize: 9, color: MUTED, marginBottom: 1 },
  repairPrice: { fontSize: 13, fontWeight: "800", color: TEXT },
  addBtn: {
    backgroundColor: WHITE,
    borderWidth: 1.5,
    borderColor: PRIMARY,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    minWidth: 46,
  },
  addTxt: { fontSize: 12, fontWeight: "700", color: PRIMARY },

  // REFER
  referCard: {
    backgroundColor: "#EEF2FF",
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },
  referTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: PRIMARY,
    marginBottom: 3,
  },
  referSub: { fontSize: 11, marginBottom: 12 },
  referBtn: {
    backgroundColor: PRIMARY,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: "flex-start",
  },
  referBtnTxt: { color: WHITE, fontSize: 12, fontWeight: "700" },
  referEmoji: { fontSize: 46, marginLeft: 10 },

  // OFFERS
});
