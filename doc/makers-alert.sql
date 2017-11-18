-- Column: memberid

-- ALTER TABLE public.makers DROP COLUMN memberid;

ALTER TABLE public.makers ADD COLUMN memberid character varying(10);
COMMENT ON COLUMN public.makers.memberid IS '会员号,规则：
比如20170x0001,
0空间内部人员
1本校老师和同学
9社会人士和校友
2-8备注';
