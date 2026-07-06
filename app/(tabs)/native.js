import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width: W } = Dimensions.get('window');

const SERVICES = [
  {
    id: '1',
    name: 'Drill (per hole)',
    rating: '4.81',
    reviews: '210K',
    price: '₹49',
    hasOptions: true,
    optionCount: 3,
    img: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=200&q=80',
  },
  {
    id: '2',
    name: 'Carpenters consultation',
    rating: '4.66',
    reviews: '130K',
    price: '₹49',
    hasOptions: false,
    img: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=200&q=80',
  },
  {
    id: '3',
    name: 'Fan installation',
    rating: '4.72',
    reviews: '95K',
    price: '₹149',
    hasOptions: false,
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80',
  },
];

export default function HomeSections() {
  return (
    <View style={s.wrapper}>

      {/* ── SECTION 1 : HERO BANNER ── */}
      <View style={s.banner}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=700&q=80' }}
          style={s.bannerImg}
        />
        {/* Gradient overlay */}
        <View style={s.bannerOverlay} />

        <View style={s.bannerContent}>
          <Text style={s.bannerTitle}>Transform your space{'\n'}with home painting</Text>
          <Text style={s.bannerSub}>Pay after 100% satisfaction</Text>
          <TouchableOpacity style={s.bookBtn} activeOpacity={0.85}>
            <Text style={s.bookTxt}>Book now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── SECTION 2 : HOME REPAIR & INSTALLATION ── */}
      <View style={s.section}>

        {/* Section Header */}
        <View style={s.sectionHead}>
          <Text style={s.sectionTitle}>Home repair &{'\n'}installation</Text>
          <TouchableOpacity>
            <Text style={s.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Horizontal Service Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.cardList}
        >
          {SERVICES.map((item) => (
            <View key={item.id} style={s.card}>

              {/* Service Image */}
              <View style={s.cardImgBox}>
                <Image source={{ uri: item.img }} style={s.cardImg} />
              </View>

              {/* Name */}
              <Text style={s.cardName} numberOfLines={2}>{item.name}</Text>

              {/* Rating */}
              <View style={s.ratingRow}>
                <Text style={s.star}>★</Text>
                <Text style={s.ratingTxt}>{item.rating}</Text>
                <Text style={s.reviewsTxt}> ({item.reviews})</Text>
              </View>

              {/* Price + Add */}
              <View style={s.cardFooter}>
                <View>
                  <Text style={s.startsAt}>Starts at</Text>
                  <Text style={s.price}>{item.price}</Text>
                </View>
                <TouchableOpacity style={s.addBtn} activeOpacity={0.8}>
                  <Text style={s.addTxt}>Add</Text>
                  {item.hasOptions && (
                    <Text style={s.optionsTxt}>{item.optionCount} options</Text>
                  )}
                </TouchableOpacity>
              </View>

            </View>
          ))}
        </ScrollView>
      </View>

    </View>
  );
}

const TEXT = '#1A1A1A';
const MUTED = '#6B7280';
const PURPLE = '#6B21E8';
const BORDER = '#E5E7EB';

const s = StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
  },

  // ── BANNER
  banner: {
    marginHorizontal: 12,
    marginVertical: 10,
    borderRadius: 18,
    overflow: 'hidden',
    height: 200,
  },
  bannerImg: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.22)',
  },
  bannerContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-end',
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    lineHeight: 27,
    marginBottom: 3,
  },
  bannerSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 14,
  },
  bookBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 9,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  bookTxt: {
    fontSize: 13,
    fontWeight: '700',
    color: TEXT,
  },

  // ── SECTION
  section: {
    paddingTop: 14,
    paddingBottom: 8,
  },
  sectionHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: TEXT,
    lineHeight: 23,
    letterSpacing: -0.2,
  },
  seeAll: {
    fontSize: 13,
    fontWeight: '700',
    color: PURPLE,
    marginTop: 2,
  },

  // ── CARDS
  cardList: {
    paddingHorizontal: 10,
    gap: 10,
  },
  card: {
    width: 150,
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  cardImgBox: {
    width: '100%',
    height: 110,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
    marginBottom: 8,
  },
  cardImg: {
    width: '100%',
    height: '100%',
  },
  cardName: {
    fontSize: 13,
    fontWeight: '700',
    color: TEXT,
    lineHeight: 18,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  star: {
    fontSize: 11,
    color: '#F59E0B',
  },
  ratingTxt: {
    fontSize: 11,
    fontWeight: '700',
    color: TEXT,
    marginLeft: 2,
  },
  reviewsTxt: {
    fontSize: 10,
    color: MUTED,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 'auto',
  },
  startsAt: {
    fontSize: 9,
    color: MUTED,
    marginBottom: 1,
    fontWeight: '500',
  },
  price: {
    fontSize: 14,
    fontWeight: '800',
    color: TEXT,
  },
  addBtn: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: PURPLE,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
    alignItems: 'center',
    minWidth: 50,
  },
  addTxt: {
    fontSize: 13,
    fontWeight: '700',
    color: PURPLE,
  },
  optionsTxt: {
    fontSize: 9,
    color: PURPLE,
    fontWeight: '600',
    marginTop: 1,
  },
});