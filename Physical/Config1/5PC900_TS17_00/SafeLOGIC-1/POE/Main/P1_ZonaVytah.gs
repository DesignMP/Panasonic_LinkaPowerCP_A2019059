[LIT]
33
16	284	27	284	28
17	284	28	286	28
21	250	27	260	27
22	260	27	284	27
23	260	46	272	46
24	260	27	260	46
57	39	106	42	106
58	39	118	42	118
71	121	74	121	51
72	68	74	78	74
73	78	74	78	86
75	78	74	121	74
76	78	86	81	86
77	121	51	150	51
78	148	110	148	55
79	148	55	150	55
80	81	110	85	110
81	85	110	148	110
82	85	123	90	123
83	85	110	85	123
84	217	31	220	31
85	219	35	220	35
86	218	23	220	23
87	188	27	220	27
88	169	27	176	27
89	162	47	174	47
90	174	47	174	31
91	174	31	176	31
98	297	46	302	46
99	302	46	318	46
100	302	60	322	60
101	302	46	302	60
104	335	60	346	60

[TET]
18
11	143	26	169	28	4	5	Status_ZonaCS_AKTIVNA
12	211	22	218	24	4	5	TRUE
13	205	30	217	32	4	5	SAFETRUE
14	207	34	219	36	4	5	SAFETRUE
15	286	27	304	29	4	3	soP1_ZonaVytah
25	318	45	344	47	4	3	P1_ZonaVytahu_AKTIVNA
46	32	105	39	107	4	5	TRUE
47	22	69	29	71	4	5	TRUE
48	25	117	39	119	4	5	TIME#50ms
49	15	81	29	83	4	5	TIME#50ms
56	8	109	42	111	4	5	siP1_Vytah_SnimacHornaPoz_CH1
59	8	113	42	115	4	5	siP1_Vytah_SnimacHornaPoz_CH2
60	4	73	29	75	4	5	siP1_Bariera_Vytah_CH1
61	4	77	29	79	4	5	siP1_Bariera_Vytah_CH2
62	115	122	143	124	4	3	P1_SnimacVytahu_AKTIVNY
63	106	85	134	87	4	3	P1_Vytah_Bariera_AKTIVNA
102	307	63	322	65	4	5	TIME#500ms
103	346	59	370	61	4	3	Release_P1_ZonaVytah

[FBS]
9
9	222	19	248	43	0	SF_EmergencyStop_V1_00	P1_Zona_Vytah
20	274	42	295	50	1	SAFEBOOL_TO_BOOL	
34	44	102	79	122	0	SF_Equivalent_V1_00	P1_SnimacHornaPolohaVytahu
44	31	66	66	86	0	SF_Equivalent_V1_00	P1_BarieraVytahu
52	92	119	113	127	1	SAFEBOOL_TO_BOOL	
55	83	82	104	90	1	SAFEBOOL_TO_BOOL	
67	178	23	186	35	1	AND_S	
70	152	43	160	59	1	OR_S	
96	324	56	333	68	0	TON	CasRelease_P1_ZonaVytah

[FPT]
41
0	222	22	232	24	Activate	0	128	0	BOOL
1	222	26	234	28	S_EStopIn	0	128	0	SAFEBOOL
2	222	30	236	32	S_StartReset	0	128	0	SAFEBOOL
3	222	34	236	36	S_AutoReset	0	128	0	SAFEBOOL
4	222	38	230	40	Reset	0	128	0	BOOL
5	241	22	248	24	Ready	1	0	128	BOOL
6	236	26	248	28	S_EStopOut	1	0	128	SAFEBOOL
7	242	30	248	32	Error	1	0	128	BOOL
8	238	34	248	36	DiagCode	1	0	128	WORD
18	274	45	276	47		0	640	0	SAFEBOOL
19	294	45	295	47		1	0	640	BOOL
26	44	105	54	107	Activate	0	128	0	BOOL
27	44	109	57	111	S_ChannelA	0	128	0	SAFEBOOL
28	44	113	57	115	S_ChannelB	0	128	0	SAFEBOOL
29	44	117	62	119	DiscrepancyTime	0	128	0	TIME
30	72	105	79	107	Ready	1	0	128	BOOL
31	62	109	79	111	S_EquivalentOut	1	0	128	SAFEBOOL
32	73	113	79	115	Error	1	0	128	BOOL
33	69	117	79	119	DiagCode	1	0	128	WORD
36	31	69	41	71	Activate	0	128	0	BOOL
37	31	73	44	75	S_ChannelA	0	128	0	SAFEBOOL
38	31	77	44	79	S_ChannelB	0	128	0	SAFEBOOL
39	31	81	49	83	DiscrepancyTime	0	128	0	TIME
40	59	69	66	71	Ready	1	0	128	BOOL
41	49	73	66	75	S_EquivalentOut	1	0	128	SAFEBOOL
42	60	77	66	79	Error	1	0	128	BOOL
43	56	81	66	83	DiagCode	1	0	128	WORD
50	92	122	94	124		0	640	0	SAFEBOOL
51	112	122	113	124		1	0	640	BOOL
53	83	85	85	87		0	640	0	SAFEBOOL
54	103	85	104	87		1	0	640	BOOL
64	178	26	180	28		0	1665	0	ANY_SAFEBIT
65	178	30	180	32		0	1665	0	ANY_SAFEBIT
66	185	26	186	28		1	0	641	ANY_SAFEBIT
68	152	50	154	52		0	1667	0	ANY_SAFEBIT
69	159	46	160	48		1	0	641	ANY_SAFEBIT
74	152	54	154	56		0	1665	0	ANY_SAFEBIT
92	324	59	329	61	IN	0	129	0	BOOL
93	324	63	329	65	PT	0	128	0	TIME
94	330	59	333	61	Q	1	0	129	BOOL
95	329	63	333	65	ET	1	0	128	TIME

[KOT]
0

[VER]
0

