[LIT]
34
0	70	23	77	23
1	77	23	77	34
2	77	34	84	34
3	109	34	113	34
23	77	23	84	23
24	112	71	128	71
25	73	59	80	59
26	80	71	87	71
27	80	59	80	71
47	80	59	86	59
48	74	95	77	95
49	77	113	86	113
50	77	95	77	113
70	77	95	87	95
71	33	136	36	136
72	75	140	82	140
73	82	152	91	152
74	82	140	82	152
94	82	140	90	140
113	76	181	85	181
114	85	181	85	188
115	85	188	94	188
117	85	181	90	181
118	90	181	90	180
119	90	180	92	180
156	35	245	38	245
158	77	249	83	249
159	83	249	94	249
160	83	258	94	258
161	83	249	83	258
163	77	214	83	214
164	83	214	89	214
165	83	224	96	224
166	83	214	83	224

[TET]
42
5	24	18	31	20	4	5	TRUE
6	17	30	31	32	4	5	TIME#50ms
7	7	22	31	24	4	5	siP1_BarieraBunky_CH1
8	7	26	31	28	4	5	siP1_BarieraBunky_CH2
9	113	33	147	35	4	3	P1_VstupBunky_Bariera_AKTIVNA
22	84	22	117	24	4	3	Status_P1_VstupTunela_AKTIVNY
28	27	54	34	56	4	5	TRUE
29	20	66	34	68	4	5	TIME#50ms
30	2	58	34	60	4	5	siP1_Bariera_VystupTunela_CH1
32	2	62	34	64	4	5	siP1_Bariera_VystupTunela_CH2
33	128	70	161	72	4	3	P1_VystTunela_Bariera_AKTIVNA
46	86	58	120	60	4	3	Status_P1_VystupTunela_AKTIVNY
52	28	90	35	92	4	5	TRUE
53	21	102	35	104	4	5	TIME#50ms
54	9	94	35	96	4	5	siP2_Bariera_Bunky_CH1
55	9	98	35	100	4	5	siP2_Bariera_Bunky_CH2
56	111	112	145	114	4	3	P2_VstupBunky_Bariera_AKTIVNA
69	87	94	121	96	4	3	Status_P2_VstupBariera_AKTIVNA
75	26	135	33	137	4	5	TRUE
76	22	147	36	149	4	5	TIME#50ms
77	5	139	36	141	4	5	siP3_Bariera_VstupBunky_CH1
78	5	143	36	145	4	5	siP3_Bariera_VstupBunky_CH2
80	116	151	150	153	4	3	P3_VstupBunky_Bariera_AKTIVNA
93	90	139	124	141	4	3	Status_P3_VstupBariera_AKTIVNA
96	119	187	154	189	4	3	P3_VystupBunky_Bariera_AKTIVNA
97	30	176	37	178	4	5	TRUE
98	23	188	37	190	4	5	TIME#50ms
99	5	180	37	182	4	5	siP3_Bariera_VystupBunky_CH1
100	5	184	37	186	4	5	siP3_Bariera_VystupBunky_CH2
116	92	179	125	181	4	3	Status_P3_VystBariera_AKTIVNA
120	121	223	155	225	4	3	P4_VstupBunky_Bariera_AKTIVNA
121	119	257	154	259	4	3	P4_VystupBunky_Bariera_AKTIVNA
122	31	209	38	211	4	5	TRUE
123	24	221	38	223	4	5	TIME#50ms
124	7	213	38	215	4	5	siP4_Bariera_VstupBunky_CH1
125	7	217	38	219	4	5	siP4_Bariera_VstupBunky_CH2
126	28	244	35	246	4	5	TRUE
127	24	256	38	258	4	5	TIME#50ms
128	6	248	38	250	4	5	siP4_Bariera_VystupBunky_CH1
129	6	252	38	254	4	5	siP4_Bariera_VystupBunky_CH2
157	94	248	128	250	4	3	Status_P4_VystupTunela_AKTIVNY
162	89	213	122	215	4	3	Status_P4_VstupTunela_AKTIVNY

[FBS]
14
20	33	15	68	35	0	SF_Equivalent_V1_00	P1_VstupnaBarieraBunky
21	86	30	107	38	1	SAFEBOOL_TO_BOOL	
44	89	67	110	75	1	SAFEBOOL_TO_BOOL	
45	36	51	71	71	0	SF_Equivalent_V1_00	P1_VystupnaBarieraTunela
67	37	87	72	107	0	SF_Equivalent_V1_00	P2_BarieraVstupuBunky
68	88	109	109	117	1	SAFEBOOL_TO_BOOL	
91	38	132	73	152	0	SF_Equivalent_V1_00	P3_Bunka_VstupnaBariera
92	93	148	114	156	1	SAFEBOOL_TO_BOOL	
111	39	173	74	193	0	SF_Equivalent_V1_00	P3_VystupnaBarieraBunky
112	96	184	117	192	1	SAFEBOOL_TO_BOOL	
134	98	220	119	228	1	SAFEBOOL_TO_BOOL	
135	96	254	117	262	1	SAFEBOOL_TO_BOOL	
144	40	206	75	226	0	SF_Equivalent_V1_00	P4_VstupnaBarieraTunela
154	40	241	75	261	0	SF_Equivalent_V1_00	P4_VystupnaBarieraTunela

[FPT]
70
10	33	18	43	20	Activate	0	128	0	BOOL
11	33	22	46	24	S_ChannelA	0	128	0	SAFEBOOL
12	33	26	46	28	S_ChannelB	0	128	0	SAFEBOOL
13	33	30	51	32	DiscrepancyTime	0	128	0	TIME
14	61	18	68	20	Ready	1	0	128	BOOL
15	51	22	68	24	S_EquivalentOut	1	0	128	SAFEBOOL
16	62	26	68	28	Error	1	0	128	BOOL
17	58	30	68	32	DiagCode	1	0	128	WORD
18	86	33	88	35		0	640	0	SAFEBOOL
19	106	33	107	35		1	0	640	BOOL
34	89	70	91	72		0	640	0	SAFEBOOL
35	109	70	110	72		1	0	640	BOOL
36	36	54	46	56	Activate	0	128	0	BOOL
37	36	58	49	60	S_ChannelA	0	128	0	SAFEBOOL
38	36	62	49	64	S_ChannelB	0	128	0	SAFEBOOL
39	36	66	54	68	DiscrepancyTime	0	128	0	TIME
40	64	54	71	56	Ready	1	0	128	BOOL
41	54	58	71	60	S_EquivalentOut	1	0	128	SAFEBOOL
42	65	62	71	64	Error	1	0	128	BOOL
43	61	66	71	68	DiagCode	1	0	128	WORD
57	37	90	47	92	Activate	0	128	0	BOOL
58	37	94	50	96	S_ChannelA	0	128	0	SAFEBOOL
59	37	98	50	100	S_ChannelB	0	128	0	SAFEBOOL
60	37	102	55	104	DiscrepancyTime	0	128	0	TIME
61	65	90	72	92	Ready	1	0	128	BOOL
62	55	94	72	96	S_EquivalentOut	1	0	128	SAFEBOOL
63	66	98	72	100	Error	1	0	128	BOOL
64	62	102	72	104	DiagCode	1	0	128	WORD
65	88	112	90	114		0	640	0	SAFEBOOL
66	108	112	109	114		1	0	640	BOOL
81	38	135	48	137	Activate	0	128	0	BOOL
82	38	139	51	141	S_ChannelA	0	128	0	SAFEBOOL
83	38	143	51	145	S_ChannelB	0	128	0	SAFEBOOL
84	38	147	56	149	DiscrepancyTime	0	128	0	TIME
85	66	135	73	137	Ready	1	0	128	BOOL
86	56	139	73	141	S_EquivalentOut	1	0	128	SAFEBOOL
87	67	143	73	145	Error	1	0	128	BOOL
88	63	147	73	149	DiagCode	1	0	128	WORD
89	93	151	95	153		0	640	0	SAFEBOOL
90	113	151	114	153		1	0	640	BOOL
101	39	176	49	178	Activate	0	128	0	BOOL
102	39	180	52	182	S_ChannelA	0	128	0	SAFEBOOL
103	39	184	52	186	S_ChannelB	0	128	0	SAFEBOOL
104	39	188	57	190	DiscrepancyTime	0	128	0	TIME
105	67	176	74	178	Ready	1	0	128	BOOL
106	57	180	74	182	S_EquivalentOut	1	0	128	SAFEBOOL
107	68	184	74	186	Error	1	0	128	BOOL
108	64	188	74	190	DiagCode	1	0	128	WORD
109	96	187	98	189		0	640	0	SAFEBOOL
110	116	187	117	189		1	0	640	BOOL
130	98	223	100	225		0	640	0	SAFEBOOL
131	118	223	119	225		1	0	640	BOOL
132	96	257	98	259		0	640	0	SAFEBOOL
133	116	257	117	259		1	0	640	BOOL
136	40	209	50	211	Activate	0	128	0	BOOL
137	40	213	53	215	S_ChannelA	0	128	0	SAFEBOOL
138	40	217	53	219	S_ChannelB	0	128	0	SAFEBOOL
139	40	221	58	223	DiscrepancyTime	0	128	0	TIME
140	68	209	75	211	Ready	1	0	128	BOOL
141	58	213	75	215	S_EquivalentOut	1	0	128	SAFEBOOL
142	69	217	75	219	Error	1	0	128	BOOL
143	65	221	75	223	DiagCode	1	0	128	WORD
146	40	244	50	246	Activate	0	128	0	BOOL
147	40	248	53	250	S_ChannelA	0	128	0	SAFEBOOL
148	40	252	53	254	S_ChannelB	0	128	0	SAFEBOOL
149	40	256	58	258	DiscrepancyTime	0	128	0	TIME
150	68	244	75	246	Ready	1	0	128	BOOL
151	58	248	75	250	S_EquivalentOut	1	0	128	SAFEBOOL
152	69	252	75	254	Error	1	0	128	BOOL
153	65	256	75	258	DiagCode	1	0	128	WORD

[KOT]
0

[VER]
0

